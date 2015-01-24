'use strict';

var loginController = require('../controllers/login.controller'),
  logoutController = require('../controllers/logout.controller');

module.exports = function (server) {

  var login = '/login';
  var logout = '/logout';

  server.route([
    {method: 'POST', path: login, config: {handler: loginController.login, auth: false}},
    {method: 'GET',  path: login,  config: {handler: loginController.index, auth: false}},
    {method: 'POST',  path: logout, handler: logoutController.logout}
  ]);

};
