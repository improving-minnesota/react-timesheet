var security = require('../services/security.js');

module.exports = {
  index: function (req, res, next) {
    security.sendCurrentUser(req, res, next);
  },

  create: function (req, res, next) {
    security.login(req, res, next);
  }
};