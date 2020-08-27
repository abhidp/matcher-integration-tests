import axios from 'axios';
import * as rax from 'retry-axios';
import https from 'https';
import fs from 'fs';

rax.attach();
let bankToken: string;

const raxConfig: object = {
  retry: 5,
  noResponseRetries: 5,
  retryDelay: 2000,
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
  statusCodesToRetry: [
    [100, 199],
    [401, 429],
    [500, 599]
  ],
  backoffType: 'static',
  onRetryAttempt: (err: any) => {
    const cfg = rax.getConfig(err);
    if (cfg.currentRetryAttempt === 1) console.log('');
    console.log(`       \u001b[36mRetry attempt #${cfg.currentRetryAttempt} at ${new Date().toLocaleString()}`);
  }
};

export const authenticateAsMerchant = async (data?: object) => {
  const config: object = {
    method: 'POST',
    url: `${process.env.API_PREFIX}/v1/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data,
    timeout: 10000
  };

  const response = await axios(config);
  return response.data.jwt_token;
};

export const options = async (method: string, path: string, accessToken?: any, data?: any) => {
  return {
    method,
    url: `${process.env.API_PREFIX}${path}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data,
    timeout: 10000,
    raxConfig
  };
};

export const authenticateAsBank = async () => {
  const httpsAgent = new https.Agent({
    cert: fs.readFileSync(process.env.CERT),
    key: fs.readFileSync(process.env.PRIVATE_KEY),
    passphrase: process.env.PASSPHRASE
  });

  return await axios.get(process.env.AUTH_API_PREFIX, { httpsAgent }).then((response) => {
    response.data.jwt_tokens.map((token: any) => {
      if (token.jwt_payload.role.sub == process.env.SLYP_BANK)
        if (token.jwt_token.length > 500) bankToken = token.jwt_token;
    });
    return bankToken;
  });
};

export const authoriseAsConsumer = async (consumerXRef: string, bankToken: string) => {
  let config: any = await options('GET', `/v1/authorise/consumer/${consumerXRef}`, bankToken);
  return await axios(config).then((response) => {
    return response.data.jwt_token;
  });
};
