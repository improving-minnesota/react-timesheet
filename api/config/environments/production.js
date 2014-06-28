var express = require('express'),
  properties = require('../properties'),
  pkg = require('../../../package.json');

module.exports = function() {
  console.log(" * Applying production configurations");

  this.set('port', properties.server.prod.port);

  // Serve static content
  this.use(express.static(__dirname + "/../../../client/dist/" + pkg.name));

  this.use(function (req, res) {
    res.send(404);
  });
};
