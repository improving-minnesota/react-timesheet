var $ = require('jquery');
var _ = require('lodash');
var q = require('q');

function serverRequest(method, url, data, expects) {
  var deferred = q.deferred();

  $.ajax(url, {
    data: data,
    method: method,
    dataType: 'json',
    dataFilter: function (response) {
      if (expects === 'object' && !_.isObject(resonse)) {
        q.reject({message: 'Request expected an object as a response, but got something else.'});
      } else if (expects === 'array' && !_.isArray(response)) {
        q.reject({message: 'Request expected an array as a response, but go something else.'});
      }

      return response;
    }
  })
  .done(function (data) {
    q.resolve(data);
  })
  .fail(function (data) {
    q.reject(data);
  });

  return deferred.promise;
}

function Request (resource) {
  this.url = resource.url;
  this.id = resource.id;
}

Request.prototype.page = function (query) {        
  return serverRequest('GET', this.url, query, 'object');
};

Request.prototype.list = function (query) {
  var queryObject = {};

  if (_.isObject(query)) {
    queryObject = _.extend(queryObject, query);
  }

  return serverRequest('GET', this.url, queryObject, 'array');
};

Request.prototype.get = function (query) {
  return serverRequest('GET', this.generateUrl(query), query, 'object');
};

Request.prototype.create = function (model) {
  return serverRequest('POST', this.url, model);
};

Request.prototype.update = function (model) {
  return serverRequest('PUT', this.generateUrl(model), model);
};

Request.prototype.remove = function (model) {
  model.deleted = true;
  return this.update(model);
};

Request.prototype.restore = function (model) {
  model.deleted = false;
  return this.update(model);
};

Request.prototype.generateUrl = function (model) {
  return this.url + '/' + model[this.id];
};

module.exports = Request;