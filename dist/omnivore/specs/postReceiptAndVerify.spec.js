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
const productCalatog_1 = __importDefault(require("../../data/requestPayloads/productCalatog"));
const receipt_1 = __importDefault(require("../../data/requestPayloads/receipt"));
describe('Create receipt as Merchant and verify by getting the receipt', () => {
    let authToken, accessToken, xref;
    before('Authenticate as Merchant Uploader and get Auth Token', () => __awaiter(void 0, void 0, void 0, function* () {
        // Request Merchant Uploader api-key
        const data = {
            merchant: process.env.MERCHANT_DEFAULT,
            integrator: process.env.INTEGRATOR
        };
        accessToken = yield options.getJwtToken();
        const apiKeyconfig = yield options.options('POST', '/v1/api-keys/merchant-uploader', accessToken, data);
        const apiKey = (yield axios_1.default(apiKeyconfig)).data['api-key'];
        // Get an Auth Token as Merchant Uploader Role
        const getAuthTokenRequestBody = {
            apiKey,
            requiredRole: {
                merchant_uploader: data
            }
        };
        let token = null;
        const authTokenconfig = yield options.options('POST', '/v1/authenticate', token, getAuthTokenRequestBody);
        authToken = (yield axios_1.default(authTokenconfig)).data['jwt_token'];
        // Upload Product catalogue
        const productCatalogPayload = productCalatog_1.default.productCatalogPayload;
        const config = yield options.options('POST', '/v2/products/upload', authToken, productCatalogPayload);
        yield axios_1.default(config).catch((error) => {
            console.log('ERROR :', error);
        });
    }));
    it('Should create a receipt successfully as a Merchant', () => __awaiter(void 0, void 0, void 0, function* () {
        const receiptPayload = receipt_1.default.receiptPayload;
        let config = yield options.options('POST', '/v1/receipts', accessToken, receiptPayload);
        config.headers['x-slyp-external-correlation-id'] = process.env.X_SLYP_EXTERNAL_CORRELATION_ID;
        yield axios_1.default(config).then((response) => {
            chai_1.expect(response.status).to.equal(200);
            chai_1.expect(response.statusText).to.equal('OK');
            chai_1.expect(response.data).to.have.key('xref');
            chai_1.expect(response.data.xref).to.be.not.null;
            chai_1.expect(response.data.xref).to.be.not.empty;
            xref = response.data.xref;
        });
    }));
    it('Should successfully get the above created receipt', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield options.options('GET', `/v1/receipts/${xref}`, accessToken);
        yield axios_1.default(config).then((response) => {
            chai_1.expect(response.status).to.equal(200);
            chai_1.expect(response.statusText).to.equal('OK');
            chai_1.expect(response.data.xref).to.equal(xref);
            chai_1.expect(response.data.merchant).to.equal(process.env.MERCHANT_DEFAULT);
        });
    }));
});
//# sourceMappingURL=postReceiptAndVerify.spec.js.map