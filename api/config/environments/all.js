var express = require('express'),
  util = require('util'),
  properties = require('../properties');
  proxy = require('../proxy');

module.exports = function() {
  console.log(" * Applying base configurations");

  this.set('views', __dirname + '/../../src/views');

  // Setup jade templates
  this.set('view engine', 'jade');
  this.engine('jade', require('jade').__express);

  this.use(express.compress());
  this.use(proxy);
    
};
