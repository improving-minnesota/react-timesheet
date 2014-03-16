var express = require('express')
  , properties = require('../properties');

module.exports = function () {
  this.set('port', properties.server.debug.listenPort);
  this.set('securePort', properties.server.debug.securePort);

  this.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));

  // Serve static content
  this.use(express.static(__dirname + "/../../../client/dist/timesheet-debug"));

  this.use(function (req, res) {
    res.send(404);
  });
};
