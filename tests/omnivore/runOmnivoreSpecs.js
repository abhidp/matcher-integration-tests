const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const mochaOptions = require('../../config/mocha');
const mocha = new Mocha(mochaOptions);
const { execSync } = require('child_process');
const testDir = 'tests/omnivore/specs';

execSync('sh tests/omnivore/data/env/createEnvFiles.sh', { stdio: 'inherit' }, (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});

const envPath = 'tests/omnivore/data/env/.env';
const env = require('dotenv').config({ path: envPath });

const envVariables = env.parsed;
const isEnvEmpty = !Object.values(envVariables).some((x) => x !== null && x !== '');

if (isEnvEmpty) {
  console.error(
    '\033[31m',
    `\nPlease populate all values in ${envPath} using .envSample as a guide to run tests\n`,
    '\033[0m'
  );
} else {
  fs.readdirSync(testDir)
    .filter(function (file) {
      return path.extname(file) === '.ts';
    })
    .forEach(function (file) {
      mocha.addFile(path.join(testDir, file));
    });

  mocha.run();
}
