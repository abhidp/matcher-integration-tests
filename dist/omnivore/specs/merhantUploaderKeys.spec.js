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
describe('request merchant uploader api-key', () => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken, data;
    describe('negative scenarios', () => {
        it('should return 401: Unauthorized when access token is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            accessToken = null;
            data = null;
            const config = yield options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
            yield axios_1.default(config).catch(error => {
                chai_1.expect(error.response.data).to.be.an('object');
                chai_1.expect(error.response.status).to.equal(401);
                chai_1.expect(error.response.statusText).to.equal('Unauthorized');
                chai_1.expect(error.response.data.message).to.equal('Unauthorized');
            });
        }));
        it('should return 400: Bad Request when request body is malformed', () => __awaiter(void 0, void 0, void 0, function* () {
            accessToken = yield options.getJwtToken();
            data = null;
            const config = yield options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
            yield axios_1.default(config).catch(error => {
                chai_1.expect(error.response.status).to.equal(400);
                chai_1.expect(error.response.statusText).to.equal('Bad Request');
                chai_1.expect(error.response.data).to.be.an('object');
                chai_1.expect(error.response.data.msg).to.be.equal('missing struct field merchant at $');
                chai_1.expect(error.response.data.code).to.be.equal('E0000000');
                chai_1.expect(error.response.data.detail).to.be.null;
            });
        }));
    });
    describe('positive scenarios', () => {
        before('authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
            accessToken = yield options.getJwtToken();
        }));
        it('should successfully get an apikey for merchant uploader', () => __awaiter(void 0, void 0, void 0, function* () {
            data = {
                "merchant": process.env.MERCHANT_DEFAULT,
                "integrator": process.env.INTEGRATOR
            };
            const config = yield options.options('POST', '/api-keys/merchant-uploader', accessToken, data);
            yield axios_1.default(config).then(response => {
                chai_1.expect(response.status).to.equal(200);
                chai_1.expect(response.statusText).to.equal('OK');
                chai_1.expect(response.data).to.be.an('object');
                chai_1.expect(response.headers['content-type']).to.contain('application/json');
            }).catch(error => {
                console.log(error.response.data);
            });
        }));
    });
}));
//# sourceMappingURL=merhantUploaderKeys.spec.js.map