var express = require('express'),
  properties = require('../properties'),
  pkg = require('../../../package.json');

module.exports = function() {
  console.log(" * Applying debug configurations");

  this.set('port', properties.server.debug.port);

  this.use(express.logger('dev'));
  this.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));

  // Serve static content
  this.use(express.static(__dirname + "/../../../client/dist/" + pkg.name + "-debug"));

  this.use(function (req, res) {
    res.send(404);
  });
};
