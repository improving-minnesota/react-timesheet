var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  security = require('../services/security.js');

var LogoutController = new Controller();

LogoutController.create = function () {
  security.logout(this.__req, this.__res, this.__next);
};

module.exports = LogoutController;