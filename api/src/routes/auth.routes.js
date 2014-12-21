'use strict';

var loginController = require('../controllers/login.controller'),
  logoutController = require('../controllers/logout.controller');

module.exports = function (server) {

  var login = '/login';
  var logout = '/logout';

  server.route([
    {method: 'GET',   path: login,  handler: loginController.index},
    {method: 'POST',  path: login,  handler: loginController.create},
    {method: 'POST',  path: logout, handler: logoutController.create}
  ]);

};
