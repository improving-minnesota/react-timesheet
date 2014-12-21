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
    handler: {
      directory: {
        path: Path.join(__dirname, '../../../client/dist/assets')
      }
    }
  });

  // this.use(require('compression')({
  //   level: 9
  // }));
  //
  // this.use(require('cookie-parser')(properties.security.cookieSecret));
  //
  // this.use(require('body-parser')());
  //
  // this.use(session({
  //   secret: properties.session.secret,
  //   key: properties.session.key,
  //   store: new NedbStore({filename: 'api/data/db/session.json'}),
  //   cookie: {
  //     path: '/',
  //     httpOnly: true,
  //     maxAge: 24 * 3600 * 1000
  //   }
  // }));
  //
  // this.use(passport.initialize());
  // this.use(passport.session());

  // Initialize the routes
  require('../util').walk(__dirname + '/../../src/routes', null, function (path) {
    require(path)(server);
  });
};
