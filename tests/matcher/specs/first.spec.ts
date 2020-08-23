import * as options from '../../../config/options';
import { expect } from 'chai';
import authenticate from '../data/requestPayloads/authenticate';

describe('FIRST', async () => {
  let accessToken: string,
    data: object = authenticate.requestBody;

  console.log('data===', data);

  it('AUTHENTICATE', async () => {
    accessToken = await options.getJwtToken(data);
    console.log('accessToken====', accessToken);

    expect(accessToken).to.be.string;
  });
});
