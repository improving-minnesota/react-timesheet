var api = requre('./api');

function Data() {}

Data.prototype.page = function (resource, query) {        
  return api[resource].paged(query);
};

Data.prototype.list = function (resource, query) {
  var queryObject = {};

  if (angular.isObject(query)) {
    queryObject = angular.extend(queryObject, query);
  }

  return api[resource].query(queryObject);
};

Data.prototype.get = function (resource, query) {
  return api[resource].get(query);
};

Data.prototype.create = function (resource, model) {
  return api[resource].create(model);
};

Data.prototype.update = function (resource, model) {
  return api[resource].update(model);
};

Data.prototype.remove = function (resource, model) {
  model.deleted = true;
  return this.update(resource, model);
};

Data.prototype.restore = function (resource, model) {
  model.deleted = false;
  return this.update(resource, model);
};

Data.prototype.login = function (model, current) {
  if (current) {
    return api.login.current();
  }
  return api.login.login(model);
};

Data.prototype.logout = function () {
  return api.logout.logout();
};

module.exports = new Data();
