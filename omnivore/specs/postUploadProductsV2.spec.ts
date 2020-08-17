import 'regenerator-runtime/runtime.js';
import * as options from '../../config/options';
import axios from 'axios';
import { expect } from 'chai';

describe('Upload Products v2', () => {
  let authToken: string, v2: boolean;
  before('Authenticate as Merchant Uploader and get Auth Token', async () => {
    // Request Merchant Uploader api-key
    const data: object = {
      merchant: process.env.MERCHANT_DEFAULT,
      integrator: process.env.INTEGRATOR
    };

    const accessToken: string = await options.getJwtToken();
    const apiKeyconfig: object = await options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
    const apiKey = (await axios(apiKeyconfig)).data['api-key'];

    // Get an Auth Token as Merchant Uploader Role
    const getAuthTokenRequestBody: object = {
      apiKey,
      requiredRole: {
        merchant_uploader: data
      }
    };

    let token = null;
    const authTokenconfig: object = await options.options('POST', '/authenticate', token, getAuthTokenRequestBody);
    authToken = (await axios(authTokenconfig)).data['jwt_token'];
  });

  it('should upload a product successfully', async () => {
    const requestPayload: object = [
      {
        merchant: process.env.MERCHANT_DEFAULT,
        external_id: '123456789',
        name: 'VITTORIA WRAP DRESS',
        short_description: null,
        description:
          'Wrap around in style with the Vittoria Wrap Dress and its starry print. Perfect to transform from day to night, the Vittoria Wrap Dress will have you ready for any occasion. The dress is mini in length and features a wrap front neckline with a self tie and gathered detailing at the sleeves\nFor a trendy day look, style with a military style cap, leather jacket and sneakers then transform into a night look by pairing with strappy heels and statement gold earrings.\nModel height: 178cm | Model wears Size 36',
        warranty_period: 0,
        serial_number: null,
        image_url: 'https://www.pingdata.io/products/kookai/Vittoria_Wrap_279_900x1800.jpg',
        external_links: {
          product: 'http://product',
          manufacturer: 'http://manufacturer',
          custom: {
            name: 'name',
            description: 'description',
            url: 'http://custom'
          }
        },
        categories: [
          'Cordless Telephones',
          'root-catalog ~ default-category ~ cat ~ kitten ~ food',
          'root-catalog ~ default-category ~ brand ~ royal-canin'
        ],
        variants: [
          {
            variant_sku: '{{variant-sku-1}}',
            quantity: 100,
            pricing: {
              price: 109.95,
              tax: 1e1,
              tax_type: 'AU_GST',
              currency_code: 'AUD'
            },
            barcode: {
              id: '9003579308745',
              format: 'upc'
            },
            attributes: {
              grossWeight: 250,
              unique: 'anything'
            }
          },
          {
            variant_sku: '{{variant-sku-2}}',
            quantity: 100,
            pricing: {
              price: 109.95,
              tax: 1e1,
              tax_type: 'AU_GST',
              currency_code: 'AUD'
            },
            barcode: {
              id: '9003579308745',
              format: 'upc'
            }
          }
        ]
      }
    ];

    const config: object = await options.options('POST', '/products/upload', authToken, requestPayload, (v2 = true));
    await axios(config).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
    });
  });
});
