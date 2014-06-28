var express = require('express'),
  util = require('util'),
  properties = require('../properties');

module.exports = function() {
  console.log(" * Applying base configurations");

  this.set('views', __dirname + '/../../src/views');

  // Setup jade templates
  this.set('view engine', 'jade');
  this.engine('jade', require('jade').__express);
};
