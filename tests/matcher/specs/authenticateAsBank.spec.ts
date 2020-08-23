import { expect } from 'chai';
import axios from 'axios';
import https from 'https';
import fs from 'fs';

import * as options from '../../../config/options';
import authenticate from '../data/requestPayloads/authenticate';
import receipt from '../data/requestPayloads/receipt';

describe.only('SECOND', async () => {
  it('authorise as Bank', async () => {
    const httpsAgent = new https.Agent({
      cert: fs.readFileSync(process.env.CERT),
      key: fs.readFileSync(process.env.KEY),
      passphrase: process.env.PASSPHRASE
    });

    const result = await axios.get('https://auth.api.uat-slyp.com.au:443', { httpsAgent });
    console.log('result==', result.data.certificate);
  });
});
