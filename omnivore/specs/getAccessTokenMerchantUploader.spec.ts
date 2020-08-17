import 'regenerator-runtime/runtime.js';
import * as options from '../../config/options';
import axios from 'axios';
import { expect } from 'chai';

describe('Request Access Token as Merchant Uploader Role', async () => {
  let accessToken: string,
    apiKey: string,
    data: object = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };

  before('Authenticate', async () => {
    accessToken = await options.getJwtToken();
    const config: object = await options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
    try {
      const response = await axios(config);
      apiKey = response.data['api-key'];
    } catch (error) {
      console.log(error.response.data);
    }
  });

  it('Should return 400: Bad request when apiKey is not provided in the body', async () => {
    const bodyWithoutApiKey = {
      requiredRole: {
        merchant_uploader: data
      }
    };

    const config: object = await options.options('POST', '/authenticate', (accessToken = null), bodyWithoutApiKey);
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
        merchant_uploader: data
      }
    };

    const config: object = await options.options('POST', '/authenticate', (accessToken = null), bodyWithInvalidApiKey);
    await axios(config).catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.statusText).to.equal('Unauthorized');
      expect(error.response.data).to.be.an('object');
      expect(error.response.data.msg).to.be.equal('Unauthorized');
      expect(error.response.data.code).to.be.equal('E0000000');
      expect(error.response.data.detail).to.be.null;
    });
  });

  it('Should successfully get an auth token for merchant uploader', async () => {
    const validRequestBody = {
      apiKey,
      requiredRole: {
        merchant_uploader: data
      }
    };
    const config: object = await options.options('POST', '/authenticate', (accessToken = null), validRequestBody);
    await axios(config).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.data).to.be.an('object');
      expect(response.data.jwt_token).to.be.not.null;
      expect(response.data.jwt_token).to.be.not.empty;
      expect(response.data.userRole).to.be.an('object');
      expect(response.data.userRole).to.have.key('merchant_uploader');
      expect(response.data.userRole.merchant_uploader).to.deep.equal(data);
    });
  });
});
