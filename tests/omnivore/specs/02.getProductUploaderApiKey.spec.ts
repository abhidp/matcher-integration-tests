import axios from 'axios';
import { expect } from 'chai';

import * as api from '../../../config/api';
import { productUploaderApiKeyResponseSchema } from '../data/responseSchemas/authenticate';

describe('Request Product Uploader Api-Key', async () => {
  let merchantAccessToken: string, data: object;
  const authenticateBody: object = {
    apiKey: process.env.API_KEY,
    requiredRole: {
      merchant_default: process.env.MERCHANT_DEFAULT
    }
  };

  describe('Negative scenarios', async () => {
    it('Should return 401: Unauthorized when access token is not provided', async () => {
      merchantAccessToken = null;
      data = null;
      const config: object = await api.options('POST', '/v1/api-keys/product-uploader', merchantAccessToken, data);

      await axios(config).catch((error) => {
        expect(error.response.data).to.be.an('object');
        expect(error.response.status).to.equal(401);
        expect(error.response.statusText).to.equal('Unauthorized');
        expect(error.response.data.message).to.equal('Unauthorized');
      });
    });

    it('Should return 400: Bad Request when "merchant" is missing from request body', async () => {
      merchantAccessToken = await api.authenticateAsMerchant(authenticateBody);
      data = {
        integrator: process.env.INTEGRATOR
      };
      const config: object = await api.options('POST', '/v1/api-keys/product-uploader', merchantAccessToken, data);
      await axios(config).catch((error) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.statusText).to.equal('Bad Request');
        expect(error.response.data).to.be.an('object');
        expect(error.response.data.msg).to.be.equal('missing struct field merchant at $');
        expect(error.response.data.code).to.be.equal('E0000000');
        expect(error.response.data.detail).to.be.null;
      });
    });

    it('Should return 400: Bad Request when "integrator" is missing from request body', async () => {
      merchantAccessToken = await api.authenticateAsMerchant(authenticateBody);
      data = {
        merchant: process.env.MERCHANT_DEFAULT
      };
      const config: object = await api.options('POST', '/v1/api-keys/product-uploader', merchantAccessToken, data);
      await axios(config).catch((error) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.statusText).to.equal('Bad Request');
        expect(error.response.data).to.be.an('object');
        expect(error.response.data.msg).to.be.equal('missing struct field integrator at $');
        expect(error.response.data.code).to.be.equal('E0000000');
        expect(error.response.data.detail).to.be.null;
      });
    });
  });

  describe('Positive scenarios', async () => {
    before('Authenticate', async () => {
      merchantAccessToken = await api.authenticateAsMerchant(authenticateBody);
    });

    it('Should successfully get an apikey for merchant uploader', async () => {
      data = {
        merchant: process.env.MERCHANT_DEFAULT,
        integrator: process.env.INTEGRATOR
      };
      const config: object = await api.options('POST', '/v1/api-keys/product-uploader', merchantAccessToken, data);
      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data).to.be.an('object');
        expect(response.headers['content-type']).to.contain('application/json');
        expect(response.data).to.be.jsonSchema(productUploaderApiKeyResponseSchema);
      });
    });
  });
});
