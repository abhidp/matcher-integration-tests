import 'regenerator-runtime/runtime.js';
import * as data from '../data/receipt.json';
import * as options from '../config/options';
import axios from 'axios';
import { expect } from 'chai';

describe('matcher integration test', async () => {
  it('create a random receipt', async () => {
    const config: object = await options.options('POST', '/receipts', data);
    const response = await axios(config);

    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.headers['content-type']).to.contain('application/json');
  });
});
