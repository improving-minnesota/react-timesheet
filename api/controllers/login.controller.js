var security = require('../services/security');
var props = require('../properties');

module.exports = {
  index: security.sendCurrentUser,
  login: security.login
};
