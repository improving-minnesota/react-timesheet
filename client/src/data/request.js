var $ = require('jquery');
var _ = require('lodash');
var q = require('q');

function serverRequest(method, url, data, expects) {
  var deferred = q.defer();

  $.ajax(url, {
    data: data,
    method: method,
    dataType: 'json'
  })
  .done(function (data) {
    if (expects === 'object') {
      data = data[0];
    }
    deferred.resolve(data);
  })
  .fail(function (data) {
    deferred.reject(data);
  });

  return deferred.promise;
}

function Request (resource) {
  this.url = resource.url;
  this.params = resource.params;
}

Request.prototype.page = function (query) {        
  return serverRequest('GET', this.generateUrl(query), query, 'object');
};

Request.prototype.list = function (query) {
  var queryObject = {};

  if (_.isObject(query)) {
    queryObject = _.extend(queryObject, query);
  }

  return serverRequest('GET', this.generateUrl(query), queryObject, 'array');
};

Request.prototype.get = function (query) {
  return serverRequest('GET', this.generateUrl(query), query, 'object');
};

Request.prototype.create = function (model) {
  return serverRequest('POST', this.generateUrl(model), model);
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
  var url = this.url;

  // All resources at least have an id parameter. 
  _.forEach(this.params, function (param) {
    var token = '/:' + param;

    // if the parameter doesn't exist on the params, just blank it out.  
    var value = !_.isUndefined(model[param]) ? '/' + model[param] : '';
    url = url.replace(token, value);
  }); 

  // clean up the :_id if an id was not included
  url = url.replace('/:_id', '');

  return url;
};

module.exports = Request;
