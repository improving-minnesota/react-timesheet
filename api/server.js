var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var cookie = require('hapi-auth-cookie');
var props = require('./config/properties');

console.log('Booting Development Server');

var server = new Hapi.Server();

server.connection({
  port: 8000,
  host: 'localhost'
});

// set up the environment
require('./config/environments/all')(server);


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

        return callback(null, true, cached.account)
      })
    }
  });

  server.register({
    register: require('./src/plugins/index.route.plugin')
  },
  function (err) {
    if (err) console.log('Error registering index route: ' + err);
  });


  server.start();
});
