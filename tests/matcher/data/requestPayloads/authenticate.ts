export default {
  requestBody: {
    apiKey: process.env.API_KEY,
    requiredRole: { merchant_default: process.env.MERCHANT_DEFAULT }
  }
};
