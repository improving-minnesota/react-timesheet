var express = require('express'),
  util = require('util'),
  passport = require('passport'),
  properties = require('../properties'),
  session = require('express-session'),
  NedbStore = require('connect-nedb-session')(session);

module.exports = function() {
  console.log(" * Applying base configurations");

  this.set('views', __dirname + '/../../src/views');

  // Setup jade templates
  this.set('view engine', 'jade');
  this.engine('jade', require('jade').__express);

  this.use(require('compression')({
    level: 9
  }));

  this.use(require('cookie-parser')(properties.security.cookieSecret));
  
  this.use(require('body-parser')());

  this.use(session({ 
    secret: properties.session.secret,
    key: properties.session.key, 
    store: new NedbStore({filename: 'api/data/db/session.json'}),
    cookie: { 
      path: '/',
      httpOnly: true,
      maxAge: 24 * 3600 * 1000
    }
  }));

  this.use(passport.initialize());
  this.use(passport.session());

  // Initialize the routes
  var app = this;
  require('../util').walk(__dirname + '/../../src/routes', null, function (path) {
    app.use('/', require(path)(app));
  });
};
