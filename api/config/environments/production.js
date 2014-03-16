var express = require('express')
  , properties = require('../properties');

module.exports = function () {
  this.set('port', properties.server.prod.listenPort);
  this.set('securePort', properties.server.prod.securePort);

  // Serve static content
  this.use(express.static(__dirname + "/../../../client/dist/timesheet"));

  this.use(function (req, res) {
    res.send(404);
  });
};
