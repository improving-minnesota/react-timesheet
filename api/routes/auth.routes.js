'use strict';

var loginController = require('../controllers/login.controller'),
  logoutController = require('../controllers/logout.controller');

exports.register = function (server, options, next) {

  var login = '/login';
  var logout = '/logout';

  server.route([
    {method: 'POST', path: login, config: {handler: loginController.login, auth: false}},
    {method: 'GET',  path: login,  config: {handler: loginController.index, auth: false}},
    {method: 'POST',  path: logout, config: {handler: logoutController.logout, auth:false}}
  ]);

  return next();
};

exports.register.attributes = {
  name: 'auth-routes',
  version: '0.0.1'
};
