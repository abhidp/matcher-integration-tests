import 'regenerator-runtime/runtime.js';
import * as options from '../../config/options';
import axios from 'axios';
import { expect } from 'chai';
import productCatalog from '../../data/requestPayloads/productCalatog';
import receipt from '../../data/requestPayloads/receipt';

describe('Create receipt as Merchant and verify by getting the receipt', () => {
  let authToken: string, accessToken: string, xref: string;

  before('Authenticate as Merchant Uploader and get Auth Token', async () => {
    // Request Merchant Uploader api-key
    const data: object = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };
    accessToken = await options.getJwtToken();
    const apiKeyconfig: object = await options.options('POST', '/v1/api-keys/merchant-uploader', accessToken, data);
    const apiKey = (await axios(apiKeyconfig)).data['api-key'];

    // Get an Auth Token as Merchant Uploader Role
    const getAuthTokenRequestBody: object = {
      apiKey,
      requiredRole: {
        merchant_uploader: data
      }
    };
    let token = null;
    const authTokenconfig: object = await options.options('POST', '/v1/authenticate', token, getAuthTokenRequestBody);
    authToken = (await axios(authTokenconfig)).data['jwt_token'];

    // Upload Product catalogue
    const productCatalogPayload: object = productCatalog.productCatalogPayload;
    const config: object = await options.options('POST', '/v2/products/upload', authToken, productCatalogPayload);
    await axios(config).catch((error) => {
      console.log('ERROR :', error);
    });
  });

  it('Should create a receipt successfully as a Merchant', async () => {
    const receiptPayload: object = receipt.receiptPayload;
    let config: any = await options.options('POST', '/v1/receipts', accessToken, receiptPayload);
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

  it('Should successfully get the above created receipt', async () => {
    const config: object = await options.options('GET', `/v1/receipts/${xref}`, accessToken);
    await axios(config).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.data.xref).to.equal(xref);
      expect(response.data.merchant).to.equal(process.env.MERCHANT_DEFAULT);
    });
  });
});
