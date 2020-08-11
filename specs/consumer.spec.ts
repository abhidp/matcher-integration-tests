import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import qs from 'qs';

describe('test consumer spec', async () => {
  it('POST a new consumer', async () => {
    const data = {
      external_id: 'test',
      address: {
        state: 'NSW',
        postcode: '2000',
        country_code: 'au',
      },
      date_of_birth: {
        date: '1991-01-01',
        fidelity: 'age_range',
      },
      gender: 'male',
    };
    const options: object = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: qs.stringify(data),
      url: 'http://localhost:8080/v1/consumers',
    };
    const response = await axios(options);
    console.log('response===', response);
  });
});
