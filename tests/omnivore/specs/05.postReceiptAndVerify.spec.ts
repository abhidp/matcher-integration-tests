import axios from 'axios';
import { expect } from 'chai';

import * as api from '../../../config/api';
import { productCatalogRequestBody } from '../data/requestPayloads/productCalatog';
import { receiptPayload, receiptPayloadWithInvalidExternalId } from '../data/requestPayloads/receipt';
import {
  receiptResponseSchema,
  receiptBasketItemsProductSchema,
  invalidReceiptBasketItemsProductSchema
} from '../data/responseSchemas/receipt';

describe('Create receipt as Merchant and verify by getting the receipt', () => {
  let authToken: string, merchantAccessToken: string;
  const authenticateBody: object = {
    apiKey: process.env.API_KEY,
    requiredRole: {
      merchant_default: process.env.MERCHANT_DEFAULT
    }
  };

  it('Authenticate as Merchant and get Product Uploader Auth Token', async () => {
    // Request Product Uploader api-key
    const data: object = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };
    merchantAccessToken = await api.authenticateAsMerchant(authenticateBody);
    const apiKeyconfig: object = await api.options('POST', '/v1/api-keys/product-uploader', merchantAccessToken, data);
    const apiKey = (await axios(apiKeyconfig)).data['api-key'];

    // Get an Auth Token as Product Uploader Role
    const getAuthTokenRequestBody: object = {
      apiKey,
      requiredRole: {
        product_uploader: data
      }
    };
    let token = null;
    const authTokenconfig: object = await api.options('POST', '/v1/authenticate', token, getAuthTokenRequestBody);
    authToken = (await axios(authTokenconfig)).data['jwt_token'];

    // Upload Product catalogue
    const config: object = await api.options('POST', '/v2/products/upload', authToken, productCatalogRequestBody);
    await axios(config).catch((error) => {
      console.log('ERROR :', error);
    });
  });
  describe('Negative Scenarios', async () => {
    let xref: string;
    it('Creating receipt with invalid Product external_id', async () => {
      let config: any = await api.options(
        'POST',
        '/v1/receipts',
        merchantAccessToken,
        receiptPayloadWithInvalidExternalId
      );
      config.headers['x-slyp-external-correlation-id'] = process.env.X_SLYP_EXTERNAL_CORRELATION_ID;

      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data).to.have.key('xref');
        expect(response.data.xref).to.be.not.null;
        expect(response.data.xref).to.be.not.empty;
        xref = response.data.xref;
      });
    });

    it('Should not show Product catalog items in the receipt', async () => {
      const config: object = await api.options('GET', `/v1/receipts/${xref}`, merchantAccessToken);
      await axios(config).then((response) => {
        expect(response).to.be.not.empty;
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data.xref).to.equal(xref);
        expect(response.data.merchant).to.equal(process.env.MERCHANT_DEFAULT);
        expect(response.data).to.be.jsonSchema(receiptResponseSchema);
        expect(response.data.basket_items[0].product).to.be.jsonSchema(invalidReceiptBasketItemsProductSchema);
      });
    });
  });

  describe('Positive Scenarios', async () => {
    let xref: string;
    it('Creating a receipt with valid the Product catalog external_id', async () => {
      let config: any = await api.options('POST', '/v1/receipts', merchantAccessToken, receiptPayload);
      config.headers['x-slyp-external-correlation-id'] = process.env.X_SLYP_EXTERNAL_CORRELATION_ID;

      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data).to.have.key('xref');
        expect(response.data.xref).to.be.not.null;
        expect(response.data.xref).to.be.not.empty;
        xref = response.data.xref;
      });
    });

    it('Should successfully GET product catalog items in the receipt', async () => {
      const config: object = await api.options('GET', `/v1/receipts/${xref}`, merchantAccessToken);
      await axios(config).then((response) => {
        expect(response).to.be.not.empty;
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data.xref).to.equal(xref);
        expect(response.data.merchant).to.equal(process.env.MERCHANT_DEFAULT);
        expect(response.data).to.be.jsonSchema(receiptResponseSchema);
        expect(response.data.basket_items[0].product).to.be.jsonSchema(receiptBasketItemsProductSchema);
      });
    });
  });
});
