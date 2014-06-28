/*global module, require, logger*/
/*jslint nomen: false*/

  var _ = require('lodash'),
  Q = require('q'),
  httpProxy = require('http-proxy'),
  url = require('url'),
  proxy = httpProxy.createProxyServer(),
  properties = require('./properties');


module.exports = function (req, res, next) {
  "use strict";

  var proxied = false;

  _.each(properties.proxy, function(options, route) {
    if (req.url.match(new RegExp(route))) {
      proxy.web(
        req, res,
        { target: options.target },
        function(err) {
          res.send(500, err);
        }
      );
      proxied = true;

    }
  });

  if (!proxied) {
    next();
  }
};