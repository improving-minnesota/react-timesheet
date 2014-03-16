var express = require('express')
  , properties = require('../properties');

module.exports = function () {

  console.log(' * Starting Development Configuration');

  this.set('port', properties.server.dev.listenPort);
  this.set('securePort', properties.server.dev.securePort);

  this.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));

  // Server static content
  this.use(express.static(__dirname + "/../../../client"));
  this.use('/assets/css', express.static(__dirname + "/../../../client/dist/assets/css"));
  this.use('/assets/font', express.static(__dirname + "/../../../client/dist/assets/font"));
  this.use('/assets/img', express.static(__dirname + "/../../../client/dist/assets/img"));
  this.use('/assets/templates', express.static(__dirname + "/../../../client/dist/assets/templates"));

  this.use(function (req, res) {
    res.send(404);
  });
};