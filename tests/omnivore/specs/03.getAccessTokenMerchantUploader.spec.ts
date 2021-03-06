import axios from 'axios';
import { expect } from 'chai';

import * as api from '../../../config/api';
import { productUploaderResponseSchema } from '../data/responseSchemas/authenticate';

describe('Request Access Token as Product Uploader Role', async () => {
  let merchantAccessToken: string,
    apiKey: string,
    data: object = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };

  before('Authenticate as Merchant', async () => {
    const authenticateBody: object = {
      apiKey: process.env.API_KEY,
      requiredRole: {
        merchant_default: process.env.MERCHANT_DEFAULT
      }
    };

    merchantAccessToken = await api.authenticateAsMerchant(authenticateBody);
    const config: object = await api.options('POST', '/v1/api-keys/product-uploader', merchantAccessToken, data);
    try {
      const response = await axios(config);
      apiKey = response.data['api-key'];
    } catch (error) {
      console.log(error.response.data);
    }
  });

  it('Should return 400: Bad Request when apiKey is not provided in the body', async () => {
    const bodyWithoutApiKey = {
      requiredRole: {
        product_uploader: data
      }
    };

    const config: object = await api.options('POST', '/v1/authenticate', merchantAccessToken, bodyWithoutApiKey);
    await axios(config).catch((error) => {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.be.an('object');
      expect(error.response.data.msg).to.be.equal('missing struct field apiKey at $');
      expect(error.response.data.code).to.be.equal('E0000000');
      expect(error.response.data.detail).to.be.null;
    });
  });

  it('Should return 401: Unauthorized when an invalid apiKey is provided in the body', async () => {
    const bodyWithInvalidApiKey: object = {
      apiKey: 'invalidApiKey',
      requiredRole: {
        product_uploader: data
      }
    };

    const config: object = await api.options('POST', '/v1/authenticate', merchantAccessToken, bodyWithInvalidApiKey);
    await axios(config).catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.statusText).to.equal('Unauthorized');
      expect(error.response.data).to.be.an('object');
      expect(error.response.data.msg).to.be.equal('Unauthorized');
      expect(error.response.data.code).to.be.equal('E0000000');
      expect(error.response.data.detail).to.be.null;
    });
  });

  it('Should successfully get an auth token for product uploader', async () => {
    const validRequestBody = {
      apiKey,
      requiredRole: {
        product_uploader: data
      }
    };
    const config: object = await api.options('POST', '/v1/authenticate', merchantAccessToken, validRequestBody);
    await axios(config).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.data).to.be.an('object');
      expect(response.data.jwt_token).to.be.not.null;
      expect(response.data.jwt_token).to.be.not.empty;
      expect(response.data.userRole).to.be.an('object');
      expect(response.data.userRole).to.have.key('product_uploader');
      expect(response.data.userRole.product_uploader).to.deep.equal(data);
      expect(response.data).to.be.jsonSchema(productUploaderResponseSchema);
    });
  });
});
