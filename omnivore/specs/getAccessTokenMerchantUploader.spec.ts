import 'regenerator-runtime/runtime.js';
import * as options from '../../config/options';
import axios from 'axios';
import { expect } from 'chai';

describe('Should get an access token as a merchant uploader', async () => {
  let accessToken: string,
    apiKey: string,
    data: object = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };

  before('Authenticate', async () => {
    accessToken = await options.getJwtToken();
    data = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };
    const config: object = await options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
    try {
      const response = await axios(config);
      apiKey = response.data['api-key'];
    } catch (error) {
      console.log(error.response.data);
    }
  });

  it('should successfully get an auth token for merchant uploader', async () => {
    const body = {
      apiKey,
      requiredRole: {
        merchant_uploader: data
      }
    };

    const config: object = await options.options('POST', '/authenticate', (accessToken = null), body);
    await axios(config)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data).to.be.an('object');
        expect(response.data.userRole).to.be.an('object');
        expect(response.data.userRole).to.have.keys('merchant_uploader');
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
