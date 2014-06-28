// This is a module that can be read by both the Gruntfile and
// scripts.jade template for file location. 

exports.components = [
  // Shims
  'modernizr/modernizr.js',

  // jQuery and Related
  'jquery/dist/jquery.js',
  'select2/select2.js',
  'messenger/build/js/messenger.js',

  // bootstrap
  'bootstrap/dist/js/bootstrap.js',

  // AngularJS libraries
  'angular/angular.js',
  'angular-cookies/angular-cookies.js',
  'angular-resource/angular-resource.js',
  'angular-sanitize/angular-sanitize.js',
  'angular-animate/angular-animate.js',

  // Angular UI libraries
  'angular-ui-router/release/angular-ui-router.js',
  'angular-ui-select2/src/select2.js',
  'angular-ui-bootstrap/src/position/position.js',
  'angular-ui-bootstrap/src/dateparser/dateparser.js',
  'angular-ui-bootstrap/src/datepicker/datepicker.js',
  'angular-ui-bootstrap/src/pagination/pagination.js',
  'angular-ui-bootstrap/src/buttons/buttons.js',

  //NProgress
  'nprogress/nprogress.js',

  // utilities
  'lodash/dist/lodash.js',
  'moment/moment.js'
];

exports.watchedFiles = [
  'client/src/**/*.js',
  'client/test/**/*.js',
  '<%= assets %>/templates/**/*.html',
  '<%= assets %>/less/**/*.less'
];

exports.getComponents = function getComponents(dir) {
  var _ = require('lodash');

  return _.map(exports.components, function (component) {
    return dir + '/' + component;
  });
};
 
exports.getScripts = function getScripts(dir, dest) {
  var path = require('path');
  var fs = require('fs');
  var _ = require('lodash');
  var scripts = [];

  fs.readdirSync(dir).forEach(function (file) {
    var name = dir + '/' + file;
    var destName = dest + '/' + file;
  
    if (fs.statSync(name).isDirectory()) {
      scripts = scripts.concat(exports.getScripts(name, destName));
    } else if (path.extname(file) === '.js') {
      scripts.push(destName);
    }
  });

  return scripts;
};