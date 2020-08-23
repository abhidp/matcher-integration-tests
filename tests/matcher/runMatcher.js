const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
require('dotenv').config({ path: 'tests/matcher/.env' });

const mocha = new Mocha({
  reporter: 'list'
});
const testDir = 'tests/matcher/specs';

fs.readdirSync(testDir)
  .filter(function (file) {
    return path.extname(file) === '.ts';
  })
  .forEach(function (file) {
    mocha.addFile(path.join(testDir, file));
  });

mocha.run(function (failures) {
  process.exitCode = failures ? 1 : 0;
});
