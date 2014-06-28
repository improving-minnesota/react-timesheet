'use strict';

var loginController = require('../controllers/login.controller'),
  logoutController = require('../controllers/logout.controller'),
  router = require('express').Router();

module.exports = function (app) {

  router.route('/login')
    .get(loginController.index)
    .post(loginController.create);

  router.route('/logout')
    .post(logoutController.create);

  return router;
};
