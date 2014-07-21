var $ = require('jquery');
var _ = require('lodash');
var q = require('q');
var Request = require('./request');

var Api = function () {};

Api.prototype.add = function (config) {

  var resource = {
    url: config.url,
    id: '_id'
  };

  this[config.resource] = new Request(resource);
  return this;
};

module.exports = new Api();