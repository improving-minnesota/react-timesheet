var express = require('express'),
  properties = require('../properties');

module.exports = function () {
  console.log(" * Applying development configurations");

  this.set('port', properties.server.dev.port);

  this.use(function (req, res) {
    res.send(404);
  });
};
