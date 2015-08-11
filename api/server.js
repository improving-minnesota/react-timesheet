var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var cookie = require('hapi-auth-cookie');
var props = require('./properties');

console.log('Booting Development Server');

var server = new Hapi.Server();

server.connection({
  port: props.server.port,
  host: 'localhost'
});

// establish a session cache
var cache = server.cache({
  segment: 'sessions',
  expiresIn: props.session.expires
});
server.app.cache = cache;

// set up the view rendering
server.views({
  engines: {
    jade: require('jade')
  },
  path: Path.join(__dirname, 'views')
});

server.register(cookie, function (err) {
  server.auth.strategy('session', 'cookie', true, {
    password: props.security.cookieSecret,
    isSecure: false,
    validateFunc: function (request, session, callback) {
      cache.get(session.sid, function (err, cached) {
        if (err || !cached) {
          return callback(err, false);
        }
        return callback(null, true, cached.user);
      });
    }
  });
});

// register the routes
server.register([
  require('./routes/file.route'),
  require('./routes/auth.routes'),
  require('./routes/projects.routes'),
  require('./routes/users.routes'),
  require('./routes/index.route')
], function (err) {
  if (err) console.log('Error registering routes: ' + err);
});

// seed the database
require('./services/data').init();

// start em up
server.start();
