const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const mochaOptions = require('../../config/mocha');
const { argv } = require('yargs');
const { execSync } = require('child_process');
let env, envPath;

execSync('sh tests/matcher/data/env/createEnvFiles.sh', { stdio: 'inherit' }, (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});

switch (argv.env.toUpperCase()) {
  case 'SANDBOX':
    envPath = 'tests/matcher/data/env/SANDBOX.env';
    env = require('dotenv').config({ path: envPath });
    break;
  case 'PROD':
    envPath = 'tests/matcher/data/env/PROD.env';
    env = require('dotenv').config({ path: envPath });
    break;
  case 'UAT':
    envPath = 'tests/matcher/data/env/UAT.env';
    env = require('dotenv').config({ path: envPath });
    break;
  default:
    envPath = 'tests/matcher/data/env/TEAMS.env';
    env = require('dotenv').config({ path: envPath });
    break;
}

const envParsed = env.parsed;
const isEnvEmpty = !Object.values(envParsed).some((x) => x !== null && x !== '');

if (isEnvEmpty) {
  console.error(
    '\033[31m',
    `\nPlease populate all values in ${envPath} using .envSample as a guide to run tests\n`,
    '\033[0m'
  );
} else {
  const mocha = new Mocha(mochaOptions);
  const testDir = 'tests/matcher/specs';

  fs.readdirSync(testDir)
    .filter(function (file) {
      return path.extname(file) === '.ts';
    })
    .forEach(function (file) {
      mocha.addFile(path.join(testDir, file));
    });
  mocha.run();
}
