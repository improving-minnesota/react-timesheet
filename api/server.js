var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');

console.log('Booting Development Server');

var server = new Hapi.Server();

server.connection({
  port: 8000,
  host: 'localhost'
});

// set up the environment
require('./config/environments/all')(server);

// run the initializers

// server.route({
//   method: 'GET',
//   path: '/',
//   handler: {
//     view: 'index'
//   }
// });

server.register({
  register: require('./src/plugins/index.route.plugin')
},
function (err) {
  if (err) console.log('Error registering index route: ' + err);
});


server.start();
