var Path = require('path'),
  properties = require('../properties'),
  session = require('express-session'),
  NedbStore = require('connect-nedb-session')(session);

module.exports = function (server) {
  console.log(" * Applying base configurations");
  console.log(" * Environment: " + process.env.NODE_ENV);

  server.views({
    engines: {
      jade: require('jade')
    },
    path: Path.join(__dirname, '../../src/views')
  });

  // Serve static content
  server.route({
    method: 'GET',
    path: '/assets/{files*}',
    config: {
      handler: {
        directory: {
          path: Path.join(__dirname, '../../../client/dist/assets')
        }
      },
      auth: false
    }
  });

  // Initialize the routes
  require('../util').walk(__dirname + '/../../src/routes', null, function (path) {
    require(path)(server);
  });
};
