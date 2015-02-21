'use strict';

module.exports = {
  logout: function (request, reply) {
    request.auth.session.clear();
    return reply();
  }
};
