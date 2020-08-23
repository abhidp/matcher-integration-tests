'use strict';

module.exports = {
  diff: true,
  asyncOnly: true,
  extension: ['js'],
  package: './package.json',
  checkLeaks: true,
  forbidOnly: false,
  forbidPending: false,
  timeout: 60000,
  ui: 'bdd',
  parallel: false,
  jobs: 5,
  cleanReferencesAfterRun: true,
  reporter: ['spec', 'node_modules/mochawesome'],
  'reporter-option': [
    'overwrite=true',
    'reportTitle=API Test Report',
    'reportPageTitle=API Test Report',
    'reportDir=test_report',
    'reportFilename=test_report',
    'json=false',
    'quiet=true'
  ]
};
