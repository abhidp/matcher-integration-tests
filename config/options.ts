import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// export const getJwtToken = async () => {
//   const config: object = {
//     method: 'POST',
//     url: `${process.env.API_PREFIX}/v1/authenticate`,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: {
//       apiKey: process.env.APIKEY,
//       requiredRole: { merchant_default: process.env.MERCHANT_DEFAULT }
//     }
//   };

//   const response = await axios(config);
//   return response.data.jwt_token;
// };

export const getJwtToken = async (data: object) => {
  const config: object = {
    method: 'POST',
    url: `${process.env.API_PREFIX}/v1/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);
  return response.data.jwt_token;
};

export const options = async (method: string, path: string, accessToken?: any, data?: any, v2?: boolean) => {
  return {
    method,
    url: `${process.env.API_PREFIX}${path}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    data: JSON.stringify(data)
  };
};
