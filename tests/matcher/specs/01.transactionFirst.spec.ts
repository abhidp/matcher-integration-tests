import { expect } from 'chai';
import axios from 'axios';

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

describe('Transaction First : Matcher Integration Test', async () => {
  describe('Create transaction as Bank', async () => {
    it('Authenticate as Bank', async () => {
      await api.authenticateAsBank().then((token) => {
        expect(token).to.not.be.empty;
        expect(token).to.be.string;
        bankToken = token;
      });
    });

    it('Create a new empty Consumer as Bank', async () => {
      let config: any = await api.options('POST', '/v1/consumers', bankToken, {});
      config.headers = { ...config.headers, 'x-slyp-external-correlation-id': 'XCI-1234' };

      await axios(config).then((response) => {
        expect(response.status).to.equal(202);
        expect(response.statusText).to.equal('Accepted');
        consumerXRef = response.data.xref;
      });
    });

    it('Create a transaction for the Consumer as Bank', async () => {
      const transactionRequestBody: object = { consumer_xref: consumerXRef, ...transaction.requestBody };
      let config: any = await api.options('POST', '/v1/transactions', bankToken, transactionRequestBody);
      config.headers = {
        ...config.headers,
        'x-slyp-external-correlation-id': 'XCI-1234',
        'x-slyp-correlation-id': 'CI-1234'
      };

      await axios(config).then((response) => {
        expect(response.status).to.equal(202);
        expect(response.statusText).to.equal('Accepted');
        transactionXRef = response.data.xref;
      });
    });

    it('Get the above transaction as Bank', async () => {
      let config: any = await api.options('GET', `/v1/transactions/${transactionXRef}`, bankToken);
      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
      });
    });
  });

  describe('Create receipt as Merchant', async () => {
    it('Authenticate as Merchant', async () => {
      const data: object = authenticate.requestBody;
      merchantToken = await api.getJwtToken(data);
      expect(merchantToken).to.be.string;
      expect(merchantToken).to.not.be.empty;
      expect(merchantToken).to.not.be.null;
    });

    it('Create a random receipt as Merchant', async () => {
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

  describe('Get receipt after successful Matching', async () => {
    it('Authorise as Consumer', async () => {
      await api.authoriseAsConsumer(consumerXRef, bankToken).then((token) => {
        expect(token).to.not.be.empty;
        expect(token).to.be.string;
        consumerToken = token;
      });
    });

    it('Get receipt for this Consumer after Matching has occurred', async () => {
      let config: any = await api.options(
        'GET',
        `/v1/consumers/${consumerXRef}/receipts/${receiptXRef}`,
        consumerToken
      );
      config.headers = {
        ...config.headers,
        'x-slyp-correlation-id': 'XCI-1234-matcher-testing'
      };

      await axios(config).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.data.xref).to.equal(receiptXRef);
      });
    });
  });
});
