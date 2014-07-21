var express = require('express'),
  properties = require('../properties');

module.exports = function () {
  console.log(" * Applying development configurations");
  
  this.set('port', properties.server.dev.port);

  // Serve static content
  this.use('/assets', express.static(__dirname + '/../../../client/dist/assets'));

  this.use(function (req, res) {
    res.send(404);
  });
};
