'use strict';

var Path = require('path');

exports.register = function (server, options, next) {

  server.path(Path.join(__dirname, '../../../client/'));

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: 'dist/index.html'
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'serve-index',
  version: '0.0.1'
};
