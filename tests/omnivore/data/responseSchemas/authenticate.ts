export const merchantAuthResponseSchema: object = {
  title: 'merchant-default authentication response schema',
  type: 'object',
  required: ['jwt_token', 'userRole'],
  properties: {
    jwt_token: {
      type: 'string',
      minLength: 100
    },
    userRole: {
      type: 'object',
      required: ['merchant_default'],
      properties: {
        merchant_default: {
          type: 'string',
          pattern: '[M]+',
          minLength: 40
        }
      }
    }
  }
};

export const productUploaderResponseSchema: object = {
  title: 'product-uploader authentication response schema',
  type: 'object',
  required: ['jwt_token', 'userRole'],
  properties: {
    jwt_token: {
      type: 'string',
      minLength: 100
    },
    userRole: {
      type: 'object',
      required: ['product_uploader'],
      properties: {
        product_uploader: {
          type: 'object',
          required: ['merchant', 'integrator'],
          properties: {
            merchant: {
              type: 'string',
              pattern: '[M]+',
              minLength: 40
            },
            integrator: {
              type: 'string',
              minLength: 2
            }
          }
        }
      }
    }
  }
};

export const productUploaderApiKeyResponseSchema: object = {
  title: 'product-uploader request api-keys response schema',
  type: 'object',
  required: ['api-key', 'merchant', 'integrator'],
  properties: {
    'api-key': {
      type: 'string',
      minLength: 10
    },
    merchant: {
      type: 'string',
      pattern: '[M-]+',
      minLength: 40
    },
    integrator: {
      type: 'string',
      minLength: 2
    }
  }
};
