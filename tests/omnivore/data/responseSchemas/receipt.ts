export const receiptResponseSchema: object = {
  title: 'GET single receipt response schema',
  type: 'object',
  required: [
    'xref',
    'merchant',
    'store_id',
    'pos_id',
    'tid',
    'external_id',
    'replacement_for',
    'replaced_by',
    'basket_items',
    'raw_basket_items',
    'payment_data',
    'raw_payment_data',
    'other_payments',
    'purchaser',
    'loyalty_card_transactions',
    'issued_at',
    'is_tax_invoice',
    'total_tax',
    'total_price',
    'currency_code',
    'barcode',
    'metadata',
    'offers',
    'feedback',
    'receipt_type',
    'served_by',
    'is_test',
    'return_period',
    'indicate_taxable_items',
    'sms_message'
  ],
  properties: {
    xref: { type: 'string', pattern: '[R-X-]+', minLength: 32 },
    merchant: { type: 'string', pattern: '[M-]+', minLength: 40 },
    store_id: { type: 'string', minLength: 1 },
    basket_items: { type: 'array' },
    payment_data: { type: 'array' },
    issued_at: { type: 'number', minimum: 1500000000 },
    is_tax_invoice: { type: 'boolean' },
    total_tax: { type: 'number' },
    total_price: { type: 'number' },
    barcode: { type: 'object' }
  }
};

export const receiptBasketItemsProductSchema: object = {
  title: 'GET receipt basket_items[0].product response schema',
  type: 'object',
  required: [
    'seqno',
    'external_id',
    'name',
    'original_name',
    'short_description',
    'description',
    'attributes',
    'brand',
    'identifiers',
    'tags',
    'pricing',
    'taxes',
    'quantity_purchased',
    'unit_type',
    'unit_value',
    'warranty_period',
    'serial_number',
    'barcode',
    'image_url',
    'external_links',
    'categories',
    'original_invoice_number'
  ],
  properties: {
    seqno: { type: 'number' },
    external_id: { type: 'string' },
    name: { type: 'string' },
    original_name: { type: 'string' },
    description: { type: 'string' },
    attributes: { type: 'array' },
    brand: { type: 'string' },
    identifiers: { type: 'array' },
    tags: { type: 'array' },
    pricing: { type: 'object' },
    taxes: { type: 'array' },
    quantity_purchased: { type: 'number' },
    unit_type: { type: 'string' },
    warranty_period: { type: 'number', minimum: 1 },
    image_url: { type: 'string', format: 'uri' },
    external_links: { type: 'array', minItems: 4 },
    categories: { type: 'array' }
  }
};

export const invalidReceiptBasketItemsProductSchema: object = {
  title: 'GET receipt basket_items[0].product response schema for receipt created with invalid product external id',
  type: 'object',
  required: [
    'seqno',
    'external_id',
    'name',
    'original_name',
    'short_description',
    'description',
    'attributes',
    'brand',
    'identifiers',
    'tags',
    'pricing',
    'taxes',
    'quantity_purchased',
    'unit_type',
    'unit_value',
    'warranty_period',
    'serial_number',
    'barcode',
    'image_url',
    'external_links',
    'categories',
    'original_invoice_number'
  ],
  properties: {
    seqno: { type: 'number' },
    external_id: { type: 'string' },
    name: { type: 'string' },
    original_name: { type: 'null' },
    description: { type: 'null' },
    attributes: { type: 'array', maxItems: 0 },
    brand: { type: 'null' },
    identifiers: { type: 'array', maxItems: 0 },
    tags: { type: 'array' },
    pricing: { type: 'object' },
    taxes: { type: 'array' },
    quantity_purchased: { type: 'number' },
    unit_type: { type: 'null' },
    warranty_period: { type: 'number' },
    image_url: { type: 'null' },
    external_links: { type: 'array', maxItems: 0 },
    categories: { type: 'array', maxItems: 0 }
  }
};