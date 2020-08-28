module.exports = {
  diff: true,
  asyncOnly: true,
  checkLeaks: true,
  forbidOnly: false,
  forbidPending: false,
  timeout: 180000,
  ui: 'bdd',
  parallel: false,
  jobs: 5,
  retries: 5,
  cleanReferencesAfterRun: true,
  reporter: ['spec'],
  require: ['chai/register-expect'],
  rootHooks: {
    beforeAll() {
      const chai = require('chai');
      chai.use(require('chai-json-schema-ajv'));
      console.log(` Test Suite Started : ${new Date().toLocaleString()}\n`);
    },
    afterAll() {
      console.log(` Test Suite Ended : ${new Date().toLocaleString()}\n`);
    }
  }
};
