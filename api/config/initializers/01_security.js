/*global module, require, console*/
/*jslint nomen: false*/

var express = require('express'), 
  passport = require('passport'), 
  LocalStrategy = require('passport-local').Strategy,
  db = require('../../src/services/db');

module.exports = function () {

  console.log(' * Configuring Application Security');

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function (id, done) {
    db.findOne('users', {_id: id})
      .then(function (user) {
        console.log('found user');
        done(null, user);
      })
      .fail(function (err) {
        console.log('user err' + err);
        done(err, null);
      });
  });

  passport.use(new LocalStrategy ({
      usernameField: 'username',
      passwordField: 'password'
    },
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
        })
        .fail(function (err) {
          return done(err);
        });
    }
  ));

  // Use passport session
  this.use(passport.initialize());
  this.use(passport.session());
};