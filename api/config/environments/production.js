var express = require('express'),
  properties = require('../properties'),
  pkg = require('../../../package.json');

module.exports = function() {
  console.log(" * Applying production configurations");

  this.set('port', properties.server.prod.port);

  this.use(function (req, res) {
    res.send(404);
  });
};
