var express = require('express'),
  properties = require('../properties');

module.exports = function () {
  console.log(" * Applying development configurations");
  
  this.set('port', properties.server.dev.port);

  // Server static content
  this.use(express.static(__dirname + "/../../../client"));
  this.use('/assets/css', express.static(__dirname + "/../../../client/dist/assets/css"));
  this.use('/assets/icons', express.static(__dirname + "/../../../client/dist/assets/icons"));
  this.use('/assets/images', express.static(__dirname + "/../../../client/dist/assets/images"));
  this.use('/assets/templates', express.static(__dirname + "/../../../client/dist/assets/templates"));
  this.use('/assets/font', express.static(__dirname + "/../../../client/dist/assets/font"));

  this.use(function (req, res) {
    res.send(404);
  });
};
