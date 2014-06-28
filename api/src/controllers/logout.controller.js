var security = require('../services/security.js');

module.exports = {
  create: function (req, res, next) {
    security.logout(req, res, next);
  }
};