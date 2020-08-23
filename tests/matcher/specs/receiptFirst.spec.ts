import { expect } from 'chai';
import axios from 'axios';
import https from 'https';
import fs from 'fs';

import * as api from '../../../config/api';
import authenticate from '../data/requestPayloads/authenticate';
import receipt from '../data/requestPayloads/receipt';
import transaction from '../data/requestPayloads/transaction';

let merchantToken: string,
  bankToken: string,
  consumerToken: string,
  receiptXRef: string,
  consumerXRef: string,
  transactionXRef: string;

describe('Matcher Integration Test with Receipt first', async () => {
  describe('Create receipt first as a Merchant', async () => {
    before('Authenticate as a Merchant', async () => {
      const data: object = authenticate.requestBody;
      merchantToken = await api.getJwtToken(data);
      expect(merchantToken).to.be.string;
      expect(merchantToken).to.not.be.empty;
      expect(merchantToken).to.not.be.null;
    });

    it('Create a random receipt as a Merchant', async () => {
      const receiptPayload: object = receipt.requestBody;
      const config: any = await api.options('POST', '/v1/receipts', merchantToken, receiptPayload);

      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data).to.have.key('xref');
        expect(response.data.xref).to.be.not.null;
        expect(response.data.xref).to.be.not.empty;
        receiptXRef = response.data.xref;
      });
    });
  });

  describe('Create transaction as a Bank', async () => {
    before('Authenticate as a Bank', async () => {
      const httpsAgent = new https.Agent({
        cert: fs.readFileSync(process.env.CERT),
        key: fs.readFileSync(process.env.KEY),
        passphrase: process.env.PASSPHRASE
      });

      await axios.get(process.env.AUTH_API_PREFIX, { httpsAgent }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');

        response.data.jwt_tokens.map((token: any) => {
          //UAT
          //if (token.claims.sub == process.env.SLYP_BANK) bankToken = token.jwt_token;
          //SANDBOX
          if (token.jwt_payload.role.sub == process.env.SLYP_BANK)
            if (token.jwt_token.length > 500) bankToken = token.jwt_token;
        });
      });
    });

    it('Create a new empty Consumer as a Bank', async () => {
      let config: any = await api.options('POST', '/v1/consumers', bankToken, {});
      config.headers = { ...config.headers, 'x-slyp-external-correlation-id': 'XCI-1234' };

      await axios(config).then((response) => {
        expect(response.status).to.equal(202);
        expect(response.statusText).to.equal('Accepted');
        consumerXRef = response.data.xref;
        console.log('consumerXRef = ', consumerXRef);
      });
    });

    it('Create a transaction for the Consumer as a Bank', async () => {
      const transactionRequestBody: object = { consumer_xref: consumerXRef, ...transaction.requestBody };
      let config: any = await api.options('POST', '/v1/transactions', bankToken, transactionRequestBody);
      config.headers = {
        ...config.headers,
        'x-slyp-external-correlation-id': 'XCI-1234',
        'x-slyp-correlation-id': 'CI-1234'
      };
      console.log('Transaction config==', config);

      await axios(config).then((response) => {
        expect(response.status).to.equal(202);
        expect(response.statusText).to.equal('Accepted');
        transactionXRef = response.data.xref;
      });
    });
  });

  describe('Get receipt after successful Matching', async () => {
    before('Authorise as Consumer', async () => {
      let config: any = await api.options('GET', `/v1/authorise/consumer/${consumerXRef}`, bankToken);

      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        consumerToken = response.data.jwt_token;
        console.log('1==', consumerToken);
      });
    });

    // xit('Search receipts for Consumer', async () => {
    //   await delay(40000);
    //   let config: any = await api.options('GET', `/v1/consumers/${consumerXRef}/receipts`, bankToken);
    //   config.headers = {
    //     ...config.headers,
    //     'x-slyp-correlation-id': 'CI-1234'
    //   };
    //   await axios(config).then((response) => {
    //     console.log(response);
    //   });
    // });

    xit('Get receipt for this Consumer after Matching has occurred', async () => {
      console.log(receiptXRef);
      console.log(consumerXRef);
      console.log(transactionXRef);

      let config: any = await api.options(
        'GET',
        `/v1/consumers/${consumerXRef}/receipts/${receiptXRef}`,
        consumerToken
      );
      config.headers = {
        ...config.headers,
        'x-slyp-correlation-id': 'XCI-1234-matcher-testing'
      };

      // console.log('config== ', config);
      await delay(80000);

      await axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error===', error.response.data);
        });
    });
  });
});

const delay = (time: number) => new Promise((res) => setTimeout(res, time));
