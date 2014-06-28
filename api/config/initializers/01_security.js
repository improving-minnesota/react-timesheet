/*global module, require, console*/
/*jslint nomen: false*/

var express = require('express'), 
  passport = require('passport'), 
  LocalStrategy = require('passport-local').Strategy,
  db = require('../../src/services/db.js');

module.exports = function () {

  console.log(' * Configuring Application Security');

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function (id, done) {
    db.findOne('users', {_id: id})
      .then(function (user) {
        done(null, user);
      },
      function (err) {
        done(err, null);
      });
  });

  passport.use(new LocalStrategy (
    function (username, password, done) {
      console.log('attempting to login');

      db.findOne('users', {username: username})
        .then(function (user) {
          console.log("authentication : " + JSON.stringify(user));
          
          if (user.password === password) { 
            console.log("returning user");
            return done(null, user); 
          }

          console.log("returning false : " + password + ", " + user.password);
          return done(null, false);
        },
        function (err) {
          return done(err);
        });
    }
  ));
};