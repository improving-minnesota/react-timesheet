var security = require('../services/security');
var props = require('../../config/properties');

module.exports = {
  index: security.sendCurrentUser,
  login: security.login
};
