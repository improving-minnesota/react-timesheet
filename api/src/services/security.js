var passport = require('passport');
var Bcrypt = require('bcrypt');
var db = require('./db');

module.exports = {
  sendCurrentUser: sendCurrentUser,
  login: login
};

function sendCurrentUser (request, reply) {
  var currentUser = sanitize(request.auth.user);
  reply(currentUser);
}

function login (request, reply) {

  var message = '';
  var account = null;

  db.findOne('users', {username: request.payload.username})
    .then(function (user) {
      reply(user);
    })
    .fail(function (err) {
      reply(err).code(500);
    });


  if (!request.payload.username || !request.payload.password) {
    message = 'Missing username or password';
  }
  else {
    account = users[request.payload.username];

    if (!account || account.password !== request.payload.password) {
      message = 'Invalid username or password';
    }
  }


  var sid = String(++uuid);

  request.server.app.cache.set(sid, { user: user }, 0, function (err) {

    if (err) {
      reply(err);
    }

    request.auth.session.set({ sid: sid });
    return reply(user);
  });
};


function validate (username, password, callback) {
  var user = users[username];

  if (!user) {
    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, function (err, isValid) {
    callback(err, isValid, { id: user.id, name: user.name });
  });
}

function sanitize (user) {
  if ( user ) {
    return {
      authenticated: true,
      user : {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
      }
    };
  } else {
    return { user: null };
  }
};
