import axios from 'axios';
import { expect } from 'chai';

import * as api from '../../../config/api';
import productCalatog from '../data/requestPayloads/productCalatog';

describe('Upload Products v2', () => {
  let authToken: string;
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

    const merchantAccessToken: string = await api.authenticateAsMerchant(authenticateBody);
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
  });

  it('Should upload a product successfully', async () => {
    const requestBody = productCalatog.requestBody;

    const config: object = await api.options('POST', '/v2/products/upload', authToken, requestBody);
    await axios(config).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
    });
  });
});
