import { randomString, randomNumber } from '../../../../util/helper';

export default {
  requestBody: {
    merchant: process.env.MERCHANT_DEFAULT,
    store_id: 'BH-001',
    external_id: randomString(10),
    replacement_for: null,
    replaced_by: null,
    basket_items: [
      {
        product: {
          seqno: 1,
          external_id: '123456',
          name: 'Myobi 46cc 16inch 2 Stroke Petrol Chainsaw',
          description:
            'A rugged and high-performing power tool to get the job done right. Backed by our reputation for innovative and quality tools and hardware',
          attributes: [{ grossWeight: 250 }],
          pricing: { price: 209, tax: 19, discount: 0, tax_type: 'AU_GST', currency_code: 'AUD' },
          quantity_purchased: 1,
          warranty_period: 24,
          serial_number: '319-4599-948',
          barcode: null,
          image_url: 'https://www.pingdata.com.au/images/smartreceipt/product-sm-1.png',
          external_links: [
            { product: 'http://www.hardwarehouse.com.au/products/details/46cc-2-stroke-chainsaw-400mm' },
            { extended_warranty: 'http://www.myobi.com.au/warranty' },
            { documentation: 'http://www.hardwarehouse.com.au/products/details/46cc-2-stroke-chainsaw-400mm.pdf' },
            { manufacturer: 'http://www.myobi.com.au' },
            {
              custom: {
                name: 'Chainsaw School',
                description:
                  "Come in an learn how to handle your chainsaw. We'll be showing you the best tips and tricks for begginers through to experienced handlers.",
                url: 'http://www.hardwarehouse.com.au/schedule/35345'
              }
            }
          ],
          categories: []
        }
      },
      {
        product: {
          seqno: 2,
          external_id: '5556456',
          name: 'Myobi 12V Cordless Drill',
          description:
            'A rugged and high-performing power tool to get the job done right. Backed by our reputation for innovative and quality tools and hardware',
          attributes: [{ grossWeight: 250 }],
          pricing: { price: 104, tax: 9.45, discount: 10, tax_type: 'AU_GST', currency_code: 'AUD' },
          quantity_purchased: 1,
          warranty_period: 0,
          serial_number: '319-4599-948',
          barcode: null,
          image_url: 'https://www.pingdata.com.au/images/smartreceipt/product-sm-2.png',
          external_links: [
            { product: 'http://www.hardwarehouse.com.au/products/details/12v-drill-kit' },
            { documentation: 'http://www.hardwarehouse.com.au/products/details/12v-drill-kit.pdf' },
            { manufacturer: 'http://www.myobi.com.au' }
          ],
          categories: []
        }
      },
      {
        adjustment: {
          seqno: 3,
          name: 'Broken logo, broken images, broken barcode',
          description: 'Test how the app handles scenarios where image links are broken. Tests broken barcodes',
          pricing: { price: 0, tax: 0, discount: 0, tax_type: 'AU_GST', currency_code: 'AUD' }
        }
      }
    ],
    raw_basket_items: null,
    payment_data: [
      {
        tid: 'BH-001',
        terminal_name: 'NAB EFTPOS',
        trading_name: 'HH-Matchertest',
        address: null,
        network_merchant_id: '123456789',
        merchant_category_code: null,
        card: { pan: { mpan: '5678' }, card_type: 'visa' },
        acquirer: 'NAB',
        purchase_type: 'credit',
        transaction_type: 'purchase',
        status: 'approved',
        pos_ref_no: '697',
        transaction_reference_number: '873',
        reference_id: '348',
        rrn: '861',
        stan: '587',
        auth_code: '23',
        transaction_date: 'Mon Feb 24 2020 11:28:06 GMT+1100 (AEDT)',
        purchase_amount: 11.11,
        total: 11.11,
        currency_code: 'AUD'
      }
    ],
    raw_payment_data: null,
    purchaser: null,
    loyalty_card_transactions: [
      { name: 'Hardware House Points', number: '115', earned: 372, redeemed: 996, balance: 514 }
    ],
    issued_at: Math.round(new Date().getTime() / 1000.0) - 4000000,
    is_tax_invoice: true,
    total_tax: 11.11,
    total_price: 11.11,
    currency_code: 'AUD',
    barcode: { id: '123456789012a', format: 'upc' },
    metadata: '',
    served_by: {
      external_id: '6',
      name: 'Tevin',
      position: 'Engineer',
      photo_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/Skyhartman/128.jpg'
    },
    indicate_taxable_items: ['AU_GST'],
    is_test: false
  }
};
