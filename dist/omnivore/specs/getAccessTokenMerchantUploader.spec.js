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
describe('Should get an access token as a merchant uploader', () => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken, apiKey, data = {
        merchant: process.env.MERCHANT_DEFAULT,
        integrator: process.env.INTEGRATOR
    };
    before('Authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
        accessToken = yield options.getJwtToken();
        data = {
            merchant: process.env.MERCHANT_DEFAULT,
            integrator: process.env.INTEGRATOR
        };
        const config = yield options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
        try {
            const response = yield axios_1.default(config);
            apiKey = response.data['api-key'];
        }
        catch (error) {
            console.log(error.response.data);
        }
    }));
    it('should successfully get an auth token for merchant uploader', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            apiKey,
            requiredRole: {
                merchant_uploader: data
            }
        };
        const config = yield options.options('POST', '/authenticate', (accessToken = null), body);
        yield axios_1.default(config)
            .then((response) => {
            chai_1.expect(response.status).to.equal(200);
            chai_1.expect(response.statusText).to.equal('OK');
            chai_1.expect(response.data).to.be.an('object');
            chai_1.expect(response.data.userRole).to.be.an('object');
            chai_1.expect(response.data.userRole).to.have.keys('merchant_uploader');
        })
            .catch((error) => {
            console.error(error);
        });
    }));
}));
//# sourceMappingURL=getAccessTokenMerchantUploader.spec.js.map