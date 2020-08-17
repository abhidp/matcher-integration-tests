'use strict';

module.exports = {
  diff                    : true,
  asyncOnly               : true,
  extension               : [ 'js' ],
  package                 : './package.json',
  checkLeaks              : true,
  forbidOnly              : true,
  forbidPending           : true,
  timeout                 : 30000,
  ui                      : 'bdd',
  parallel                : false,
  jobs                    : 5,
  cleanReferencesAfterRun : true,
  'watch-files'           : [ 'lib/**/*.js', 'dist/omnivore/specs/*.spec.js' ],
  spec                    : './dist/omnivore/specs/*.spec.js',
  require                 : [ 'dotenv/config', '@babel/register' ],
  reporter                : [ 'spec', 'node_modules/mochawesome' ],
  'reporter-option'       : [
    'overwrite=true',
    'reportTitle=API Test Report',
    'reportPageTitle=API Test Report',
    'reportDir=test_report',
    'reportFilename=test_report',
    'json=false',
    'quiet=true'
  ]
};
