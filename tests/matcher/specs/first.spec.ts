import { expect } from 'chai';
import axios from 'axios';

import * as options from '../../../config/options';
import authenticate from '../data/requestPayloads/authenticate';
import receipt from '../data/requestPayloads/receipt';

describe('FIRST', async () => {
  let accessToken: string,
    data: object = authenticate.requestBody,
    xref: string;

  before('AUTHENTICATE', async () => {
    accessToken = await options.getJwtToken(data);
    expect(accessToken).to.be.string;
    expect(accessToken).to.not.be.empty;
    expect(accessToken).to.not.be.null;
  });

  it('Create a random receipt as Merchant', async () => {
    const receiptPayload: object = receipt.requestBody;
    const config: any = await options.options('POST', '/v1/receipts', accessToken, receiptPayload);

    await axios(config).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.data).to.have.key('xref');
      expect(response.data.xref).to.be.not.null;
      expect(response.data.xref).to.be.not.empty;
      xref = response.data.xref;
    });
  });
});
