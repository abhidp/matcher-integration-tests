# API Tests

API functional tests are written using the following

- [axios](https://github.com/axios/axios) - Promised based HTTP Client
- [mocha](https://github.com/mochajs/mocha) - Test Runner
- [chai](https://github.com/chaijs/chai) - Assertion library
- [ajv](https://github.com/ajv-validator/ajv) - JSON schema validator

# Repo structure

- Each component has its own folder under the `/tests` folder. Eg. matcher tests are present under `/test/matcher`
- Similarly, each compnonent has its own script. Eg. to run macher tests, run `yarn run matcher`

# Instructions

- clone this repo
- `yarn install`
- `yarn run setup`
- `yarn run <component name>`
