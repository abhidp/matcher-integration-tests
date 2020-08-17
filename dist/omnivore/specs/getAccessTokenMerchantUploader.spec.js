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
describe('Request Access Token as Merchant Uploader Role', () => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken, apiKey, data = {
        merchant: process.env.MERCHANT_DEFAULT,
        integrator: process.env.INTEGRATOR
    };
    before('Authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
        accessToken = yield options.getJwtToken();
        const config = yield options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
        try {
            const response = yield axios_1.default(config);
            apiKey = response.data['api-key'];
        }
        catch (error) {
            console.log(error.response.data);
        }
    }));
    it('Should return 400: Bad request when apiKey is not provided in the body', () => __awaiter(void 0, void 0, void 0, function* () {
        const bodyWithoutApiKey = {
            requiredRole: {
                merchant_uploader: data
            }
        };
        const config = yield options.options('POST', '/authenticate', (accessToken = null), bodyWithoutApiKey);
        yield axios_1.default(config).catch((error) => {
            chai_1.expect(error.response.status).to.equal(400);
            chai_1.expect(error.response.statusText).to.equal('Bad Request');
            chai_1.expect(error.response.data).to.be.an('object');
            chai_1.expect(error.response.data.msg).to.be.equal('missing struct field apiKey at $');
            chai_1.expect(error.response.data.code).to.be.equal('E0000000');
            chai_1.expect(error.response.data.detail).to.be.null;
        });
    }));
    it('Should return 401: Unauthorized when an invalid apiKey is provided in the body', () => __awaiter(void 0, void 0, void 0, function* () {
        const bodyWithInvalidApiKey = {
            apiKey: 'invalidApiKey',
            requiredRole: {
                merchant_uploader: data
            }
        };
        const config = yield options.options('POST', '/authenticate', (accessToken = null), bodyWithInvalidApiKey);
        yield axios_1.default(config).catch((error) => {
            chai_1.expect(error.response.status).to.equal(401);
            chai_1.expect(error.response.statusText).to.equal('Unauthorized');
            chai_1.expect(error.response.data).to.be.an('object');
            chai_1.expect(error.response.data.msg).to.be.equal('Unauthorized');
            chai_1.expect(error.response.data.code).to.be.equal('E0000000');
            chai_1.expect(error.response.data.detail).to.be.null;
        });
    }));
    it('Should successfully get an auth token for merchant uploader', () => __awaiter(void 0, void 0, void 0, function* () {
        const validRequestBody = {
            apiKey,
            requiredRole: {
                merchant_uploader: data
            }
        };
        const config = yield options.options('POST', '/authenticate', (accessToken = null), validRequestBody);
        yield axios_1.default(config).then((response) => {
            chai_1.expect(response.status).to.equal(200);
            chai_1.expect(response.statusText).to.equal('OK');
            chai_1.expect(response.data).to.be.an('object');
            chai_1.expect(response.data.jwt_token).to.be.not.null;
            chai_1.expect(response.data.jwt_token).to.be.not.empty;
            chai_1.expect(response.data.userRole).to.be.an('object');
            chai_1.expect(response.data.userRole).to.have.key('merchant_uploader');
            chai_1.expect(response.data.userRole.merchant_uploader).to.deep.equal(data);
        });
    }));
}));
//# sourceMappingURL=getAccessTokenMerchantUploader.spec.js.map