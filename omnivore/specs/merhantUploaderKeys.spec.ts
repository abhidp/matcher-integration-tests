import 'regenerator-runtime/runtime.js';
import * as options from '../../config/options';
import axios from 'axios';
import { expect } from 'chai';

describe('request merchant uploader api-key', async () => {
  let accessToken: string,
    data: object


  describe('negative scenarios', () => {
    it('should return 401: Unauthorized when access token is not provided', async () => {
      accessToken = null; data = null
      const config: object = await options.options('POST', '/api-keys/merchant-uploader', accessToken, data);

      await axios(config).catch(error => {
        expect(error.response.data).to.be.an('object')
        expect(error.response.status).to.equal(401)
        expect(error.response.statusText).to.equal('Unauthorized')
        expect(error.response.data.message).to.equal('Unauthorized')
      })
    })

    it('should return 400: Bad Request when request body is malformed', async () => {
      accessToken = await options.getJwtToken()
      data = null
      const config: object = await options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
      await axios(config).catch(error => {
        expect(error.response.status).to.equal(400)
        expect(error.response.statusText).to.equal('Bad Request')
        expect(error.response.data).to.be.an('object')
        expect(error.response.data.msg).to.be.equal('missing struct field merchant at $')
        expect(error.response.data.code).to.be.equal('E0000000')
        expect(error.response.data.detail).to.be.null
      })
    })
  })

  describe('positive scenarios', () => {
    before('authenticate', async () => {
      accessToken = await options.getJwtToken()
    })

    it('should successfully get an apikey for merchant uploader', async () => {
      data = {
        "merchant": process.env.MERCHANT_DEFAULT,
        "integrator": process.env.INTEGRATOR
      }
      const config: object = await options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
      await axios(config).then(response => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK')
        expect(response.data).to.be.an('object');
        expect(response.headers['content-type']).to.contain('application/json');
      }).catch(error => {
        console.log(error.response.data)
      })
    });
  })
});
