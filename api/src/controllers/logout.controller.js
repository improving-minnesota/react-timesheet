var security = require('../services/security.js');

module.exports = {
  logout: function (request, reply) {
    request.auth.session.clear();
    return reply();
  }
};
