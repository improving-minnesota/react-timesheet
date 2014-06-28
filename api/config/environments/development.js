var express = require('express'),
  properties = require('../properties');

module.exports = function () {
  console.log(" * Applying development configurations");
  
  this.set('port', properties.server.dev.port);
  
  this.use(this.router);
  this.use(express.logger('dev'));
  this.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));

  // Server static content
  this.use(express.static(__dirname + "/../../../client"));
  this.use('/assets/css', express.static(__dirname + "/../../../client/dist/assets/css"));
  this.use('/assets/icons', express.static(__dirname + "/../../../client/dist/assets/icons"));
  this.use('/assets/images', express.static(__dirname + "/../../../client/dist/assets/images"));
  this.use('/assets/templates', express.static(__dirname + "/../../../client/dist/assets/templates"));

  this.use(function (req, res) {
    res.send(404);
  });
};
