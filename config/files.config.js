// This is a module that can be read by both the Gruntfile and
// scripts.jade template for file locations.

// Files on the client that will kick off the watch
// task when changed.
exports.watchedFiles = [
  'client/src/**/*.js',
  'client/test/**/*.js',
  '<%= assets %>/templates/**/*.html',
  '<%= assets %>/less/**/*.less'
];

// Helper function to create the list of external libraries
// with the needed base directory for build or imports.
exports.getComponents = function getComponents(dir) {
  var _ = require('lodash');

  return _.map(exports.components, function (component) {
    return dir + '/' + component;
  });
};

// Helper function to get the urls for the application
// scripts for the build or page imports.
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
