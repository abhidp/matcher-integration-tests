'use strict';

module.exports = {
  diff                    : true,
  asyncOnly               : true,
  extension               : [ 'js' ],
  package                 : './package.json',
  checkLeaks              : true,
  forbidOnly              : true,
  forbidPending           : true,
  reporter                : 'spec',
  timeout                 : 30000,
  ui                      : 'bdd',
  parallel                : true,
  jobs                    : 5,
  cleanReferencesAfterRun : true,
  'watch-files'           : [ 'lib/**/*.js', 'dist/omnivore/specs/*.spec.js' ],
  spec                    : './dist/omnivore/specs/postUploadProductsV2.spec.js',
  require                 : [ 'dotenv/config', '@babel/register' ],
  reporter                : 'node_modules/mochawesome',
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
