export default {
  requestBody: [
    {
      merchant: 'M-4c3ef345f1515d739a46c83980b9710d18f72f9c',
      external_id: '123456-1234-1234-123456',
      name: 'Smoker parent and Grill Variant',
      description:
        'A longer description max 5000 characters. This is a root product that has a ladder image and a child variant that has a chainsaw image in its first sku variant',
      attributes: { 'any key': 'any value', 'any key2': 'any value3' },
      brand: 'A Brand',
      warranty_period: 2,
      image_url:
        'https://www.barbequesgalore.com.au/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/k/y/ky4540_2_.jpg',
      identifiers: [{ mpn: 'mpnvalue' }, { upc: 'value' }],
      external_links: {
        product: 'http://product',
        manufacturer: 'http://manufacturer',
        documentation: 'http://documentation',
        extended_warranty: 'http://extended_warranty',
        custom: [
          { name: 'custom link1', description: 'description of this link1', url: 'http://custom1' },
          { name: 'custom link2', description: 'description of this link2', url: 'http://custom2' }
        ]
      },
      categories: [
        'Cordless Telephones',
        'root-catalog ~ default-category ~ cat ~ kitten ~ food',
        'root-catalog ~ default-category ~ brand ~ royal-canin'
      ],
      google_categories: [
        'Cordless Telephones',
        'root-catalog ~ default-category ~ cat ~ kitten ~ food',
        'root-catalog ~ default-category ~ brand ~ royal-canin'
      ],
      variants: [
        {
          variant_sku: '51100001',
          quantity: 100,
          pricing: { price: 109.95, recommended_retail_price: 119.95, currency_code: 'AUD', unit_type: 'other' },
          image_url:
            'https://www.barbequesgalore.com.au/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_5365.jpg',
          identifiers: [{ sku: '2345579654599' }],
          attributes: { 'any key': 'any value', 'any key2': 'any value5' }
        },
        {
          variant_sku: '52200002',
          quantity: 70,
          pricing: { price: 9.95, recommended_retail_price: 19.95, currency_code: 'AUD', unit_type: 'kg' },
          identifiers: [{ sku: '2345579654599' }]
        }
      ]
    }
  ]
};
