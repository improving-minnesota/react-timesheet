var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  security = require('../services/security.js');

var LoginController = new Controller();

LoginController.index = function () {
  security.sendCurrentUser(this.__req, this.__res, this.__next);
};

LoginController.create = function () {
  security.login(this.__req, this.__res, this.__next);
};

module.exports = LoginController;