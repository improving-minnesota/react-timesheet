angular.module('app.resources', ['ngResource'])
  .factory('$control', function ($api) {

      var control = {

        page : function (resource, query) {        
          return $api[resource].paged(query).$promise;
        },

        list : function (resource, query) {
          var queryObject = {};

          if (angular.isObject(query)) {
            queryObject = angular.extend(queryObject, query);
          }

          return $api[resource].query(queryObject).$promise;
        },

        get : function (resource, query) {
            return $api[resource].get(query).$promise;
        },

        create : function (resource, model) {
          var saved = new $api[resource](model).$save();
          return saved.$promise || saved;
        }, 

        update : function (resource, model) {
          var updated = $api[resource].update(model);
          return updated.$promise || updated;
        },

        remove : function (resource, model) {
          model.deleted = true;
          return control.update(resource, model);
        },

        restore : function (resource, model) {
          model.deleted = false;
          return control.update(resource, model);
        },

        login : function (model, current) {
          if (current) {
            return $api.login.current().$promise;
          }
          return $api.login.login(model).$promise;
        },

        logout : function () {
          return $api.logout.logout().$promise;
        }
      };

      return control;
    }
  )

  .factory('$api', function ($resource) {

      var api = {
        idOnly : {_id: '@_id'},

        extraMethods: {
          'paged' : {
            method: 'GET',
            params: {
              page: '@page'
            }
          },
          'update' : {
            method: 'PUT'
          },
          'restore' : {
            method: 'PUT'
          }
        },

        add : function (config) {
          var params, 
            url;

          // If the url follows the expected pattern, we can set cool defaults
          if (!config.unnatural) {
            var orig = angular.copy(api.idOnly);
            params = angular.extend(orig, config.params);
            url = config.url + '/:_id';

          // otherwise we have to declare the entire configuration. 
          } else {
            params = config.params;
            url = config.url;
          }
          
          // If we supply a method configuration, use that instead of the default extra. 
          var methods = config.methods || api.extraMethods;

          api[config.resource] = $resource(url, params, methods);
        }
      };    
      
      return api;
    });