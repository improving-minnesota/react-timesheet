var passport = require('passport');

var sanitize = function (user) {
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

var security = {

  authenticationRequired: function (req, res, next) {
    console.log('authRequired');
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json(401, sanitize(req.user));
    }
  },

  adminRequired: function (req, res, next) {
    console.log('adminRequired');
    if (req.user && req.user.admin ) {
      next();
    } else {
      res.json(401, sanitize(req.user));
    }
  },

  sendCurrentUser: function (req, res, next) {
    var currentUser = sanitize(req.user);

    res.json(200, currentUser);
  },

  login: function (req, res, next) {
    
    function authenticationFailed(err, user, info) {
      if (err) { return next(err); }

      console.log('user: ' + user);
      console.log('info: ' + JSON.stringify(info));
      if (!user) { return res.json(sanitize(user)); }

      req.login(user, function (err) {
        if ( err ) { return next(err); }
        console.log("req.login");
        return res.json(sanitize(user));
      });
    }

    return passport.authenticate('local', authenticationFailed)(req, res, next);
  },

  logout: function (req, res, next) {
    req.logout();
    res.send(204);
  }
};

module.exports = security;