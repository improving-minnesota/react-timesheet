'use strict';

var Path = require('path');

exports.register = function (server, options, next) {

  server.path(Path.join(__dirname, '../../client/'));

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: {
        file: 'dist/index.html'
      },
      auth: false
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'serve-index',
  version: '0.0.1'
};
