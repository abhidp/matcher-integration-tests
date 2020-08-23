export default {
  requestBody: {
    bank_transaction_id: 'BNKTXN3092347',
    scheme_transaction_id: 'VSA-TXNaa6ea88ff3',
    message_type_indicator: '0200',
    transaction_date_time: '2020-05-12T03:04:25.960Z',
    transmission_date_time: '2020-05-12T03:04:25.960Z',
    local_transaction_date_time: '2020-05-12T03:04:25.960Z',
    processing_code: '000000',
    original_processing_code: '000000',
    response_code: 'string',
    retrieval_reference_number: '886830992',
    authorisation_identification_response: '881635',
    is_tokenised: false,
    card: { bin: '000324', last_four: '5678' },
    token: { bin: '000567', last_four: '1995' },
    amount: { transaction: { amount: 11.11, currency_code: '036' } },
    acquirer: { system_trace_audit_number: '12345678' },
    merchant: {
      category_code: '2340',
      network_id: 'string',
      terminal_id: 'string',
      pseudo_terminal_id: 'string',
      name_location: 'string'
    }
  }
};
