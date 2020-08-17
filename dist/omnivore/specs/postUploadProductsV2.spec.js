"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("regenerator-runtime/runtime.js");
const options = __importStar(require("../../config/options"));
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
describe('Upload Products v2', () => {
    let authToken, v2;
    before('Authenticate as Merchant Uploader and get Auth Token', () => __awaiter(void 0, void 0, void 0, function* () {
        // Request Merchant Uploader api-key
        const data = {
            merchant: process.env.MERCHANT_DEFAULT,
            integrator: process.env.INTEGRATOR
        };
        const accessToken = yield options.getJwtToken();
        const apiKeyconfig = yield options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
        const apiKey = (yield axios_1.default(apiKeyconfig)).data['api-key'];
        // Get an Auth Token as Merchant Uploader Role
        const getAuthTokenRequestBody = {
            apiKey,
            requiredRole: {
                merchant_uploader: data
            }
        };
        let token = null;
        const authTokenconfig = yield options.options('POST', '/authenticate', token, getAuthTokenRequestBody);
        authToken = (yield axios_1.default(authTokenconfig)).data['jwt_token'];
    }));
    it('should upload a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const requestPayload = [
            {
                merchant: process.env.MERCHANT_DEFAULT,
                external_id: '123456789',
                name: 'VITTORIA WRAP DRESS',
                short_description: null,
                description: 'Wrap around in style with the Vittoria Wrap Dress and its starry print. Perfect to transform from day to night, the Vittoria Wrap Dress will have you ready for any occasion. The dress is mini in length and features a wrap front neckline with a self tie and gathered detailing at the sleeves\nFor a trendy day look, style with a military style cap, leather jacket and sneakers then transform into a night look by pairing with strappy heels and statement gold earrings.\nModel height: 178cm | Model wears Size 36',
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
        const config = yield options.options('POST', '/products/upload', authToken, requestPayload, (v2 = true));
        yield axios_1.default(config).then((response) => {
            console.log('resp=', response);
            chai_1.expect(response.status).to.equal(200);
            chai_1.expect(response.statusText).to.equal('OK');
        });
    }));
});
//# sourceMappingURL=postUploadProductsV2.spec.js.map