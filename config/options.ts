import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export const getJwtToken = async () => {
  const config: object = {
    method: 'POST',
    url: `${process.env.BASE_URL}/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      apiKey: process.env.APIKEY,
      requiredRole: { merchant_default: process.env.MERCHANT_DEFAULT }
    }
  };

  const response = await axios(config);
  return response.data.jwt_token;
};

export const options = async (method: string, path: string, accessToken: string, data: any = '') => {
  return {
    method,
    url: `${process.env.BASE_URL}${path}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    data
  };
};
