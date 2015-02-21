'use strict';

var Path = require('path');

exports.register = function (server, options, next) {

  // Serve static content
  server.route({
    method: 'GET',
    path: '/assets/{files*}',
    config: {
      handler: {
        directory: {
          path: Path.join(__dirname, '../../client/dist/assets')
        }
      },
      auth: false
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'static-route',
  version: '0.0.1'
};
