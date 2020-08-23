export default {
  receiptPayload: {
    merchant: 'M-4c3ef345f1515d739a46c83980b9710d18f72f9c',
    store_id: 'ivans-store-12345',
    external_id: '1',
    replacement_for: null,
    replaced_by: null,
    basket_items: [
      {
        product: {
          seqno: 1,
          external_id: '51100001',
          name: 'Myobi 46cc 16inch 2 Stroke Petrol Chainsaw',
          pricing: {
            price: 209,
            tax: 19,
            discount: 0,
            tax_type: 'AU_GST',
            currency_code: 'AUD'
          }
        }
      }
    ],
    raw_basket_items: null,
    payment_data: [
      {
        tid: '7',
        terminal_name: 'NAB EFTPOS',
        trading_name: null,
        address: null,
        network_merchant_id: '123456789',
        merchant_category_code: null,
        card: {
          pan: {
            mpan: '1234'
          }
        },
        acquirer: 'NAB',
        application_label: '',
        purchase_type: 'credit',
        transaction_type: 'purchase',
        status: 'approved',
        pos_ref_no: '134771',
        transaction_reference_number: 'ref123123123',
        inv_roc_no: '345345',
        reference_id: '004637',
        application_id: 'A0000000041010',
        atc: '41',
        csn: '01',
        rrn: '34589990',
        stan: '123123',
        auth_code: '3455553',
        transaction_date: new Date(),
        purchase_amount: 263,
        total: 263,
        currency_code: 'AUD',
        pin_entered: null,
        card_token: null,
        emv: null
      }
    ],
    raw_payment_data: null,
    purchaser: null,
    loyalty_card_transactions: [],
    issued_at: Math.round(new Date().getTime() / 1000.0),
    is_tax_invoice: true,
    total_tax: 23.9,
    total_price: 263,
    currency_code: 'AUD',
    barcode: {
      id: '123456789012',
      format: 'upc'
    },
    metadata: '',
    offers: 'default_campaign',
    feedback: 'default_survey',
    served_by: {
      external_id: '674456678',
      name: 'Jessica A',
      position: 'Store Manager',
      photo_url: 'https://www.pingdata.io/images/smartreceipt/avatar.png'
    },
    is_test: false
  }
};
