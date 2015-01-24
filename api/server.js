var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var cookie = require('hapi-auth-cookie');
var data = require('./services/data');
var props = require('./properties');

console.log('Booting Development Server');

var server = new Hapi.Server();

server.connection({
  port: props.server.port,
  host: 'localhost'
});

// set up the environment
server.views({
  engines: {
    jade: require('jade')
  },
  path: Path.join(__dirname, 'views')
});

// Serve static content
server.route({
  method: 'GET',
  path: '/assets/{files*}',
  config: {
    handler: {
      directory: {
        path: Path.join(__dirname, '../client/dist/assets')
      }
    },
    auth: false
  }
});

// Initialize the routes
require('./util').walk(Path.join(__dirname, 'routes'), null, function (path) {
  require(path)(server);
});

server.register({
  register: require('./plugins/index.route.plugin')
},
function (err) {
  if (err) console.log('Error registering index route: ' + err);
});


server.register(cookie, function (err) {

  var cache = server.cache({
    segment: 'sessions',
    expiresIn: props.session.expires
  });
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', true, {
    password: props.security.cookieSecret,
    isSecure: false,
    validateFunc: function (session, callback) {

      cache.get(session.sid, function (err, cached) {

        if (err || !cached) {
          return callback(err, false);
        }

        return callback(null, true, cached.user)
      })
    }
  });
});

data.init();
server.start();
