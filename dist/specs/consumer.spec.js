"use strict";
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
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
describe('test consumer spec', () => __awaiter(void 0, void 0, void 0, function* () {
    it('POST a new consumer', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            external_id: 'test',
            address: {
                state: 'NSW',
                postcode: '2000',
                country_code: 'au',
            },
            date_of_birth: {
                date: '1991-01-01',
                fidelity: 'age_range',
            },
            gender: 'male',
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: qs_1.default.stringify(data),
            url: 'http://localhost:8080/v1/consumers',
        };
        const response = yield axios_1.default(options);
        console.log('response===', response);
    }));
}));
//# sourceMappingURL=consumer.spec.js.map