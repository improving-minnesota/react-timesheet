var $ = require('jquery');
var _ = require('lodash');
var q = require('q');
var Request = require('./request');

var Api = function () {};

Api.prototype.add = function (config) {

  // Default parameter for all resources is the id.
  var params = {
    '_id': '_id'
  };

  config.params = _.defaults(config.params, params);

  // If the url is not sent in with the configuration, create
  // it from the resource name. 
  if (_.isUndefined(config.url)) {
    config.url = '/' + config.resource;
  }
  // Append the id to the end of the url. 
  config.url = config.url + '/:_id';

  this[config.resource] = new Request(config);
  return this;
};

module.exports = new Api();