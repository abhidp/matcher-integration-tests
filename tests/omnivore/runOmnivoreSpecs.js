const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const mochaOptions = require('../../config/mocha');

require('dotenv').config({ path: 'tests/omnivore/.env' });

const mocha = new Mocha(mochaOptions);
const testDir = 'tests/omnivore/specs';

fs.readdirSync(testDir)
  .filter(function (file) {
    return path.extname(file) === '.ts';
  })
  .forEach(function (file) {
    mocha.addFile(path.join(testDir, file));
  });

mocha.run();
