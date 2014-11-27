var context = require('./context');
var queue = require('./retry.queue');
var authentication = require('./authentication');


// This service provides guard methods to protect application states.
// You can add them as resolves to states to require an admin user
// before allowing a state change to complete

function requireAuthenticatedUser () {
  return authentication.requestCurrentUser()
    .then(function (userInfo) {
      if ( !securityContext.authenticated ) {
        return queue.pushRetryFn('unauthenticated-client', function () {
          return requireAuthenticatedUser();
        });
      }
    });
};

module.exports = {
  requireAuthenticatedUser: requireAuthenticatedUser
};
