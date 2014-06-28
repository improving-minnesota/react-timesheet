module.exports = (function () {
  var DataStore = require('nedb'),
    Q = require('q'),
    _ = require('lodash');

  var db;
  var initDb = function initDb() {
    db = {};
    
    db.users = new DataStore({filename: 'api/data/db/users.json', autoload: true});
    db.users.ensureIndex({fieldName: 'username', unique: true});
    db.users.ensureIndex({fieldName: 'email', unique: true});

    db.timesheets = new DataStore({filename: 'api/data/db/timesheets.json', autoload: true});
    db.timeunits = new DataStore({filename: 'api/data/db/timeunits.json', autoload: true});

    db.projects = new DataStore({filename: 'api/data/db/projects.json', autoload: true});
    db.projects.ensureIndex({fieldName: 'name', unique: true});

    db.find = function (model, query) {
      return Q.ninvoke(db[model], 'find', query);
    };

    db.page = function (model, query) {
      var deferred = Q.defer();

      var page = query.page || 1;
      var skip = (page - 1) * 5;
      var sort = query.sort ? JSON.parse(query.sort) : {_id: 1};

      var sanitizedQuery = _.omit(query, 'page', 'sort');

      var pageConfig = {page: page, limit: 5};

      db[model]
        .count(sanitizedQuery, function (err, total) {
          if (err) {
            deferred.reject(err);
          }

          pageConfig.totalItems = total;

          db[model]
            .find(sanitizedQuery)
            .sort(sort)
            .skip(skip)
            .limit(5)
            .exec(function (err, docs) {
              if (err) {
                deferred.reject(err);
              }

              pageConfig.data = docs;
              deferred.resolve(pageConfig);
            });
        });

      return deferred.promise;
    };

    db.count = function (model, query) {
      return Q.ninvoke(db[model], 'count', query);
    };

    db.insert = function (model, body) {
      return Q.ninvoke(db[model], 'insert', body);
    };

    db.findOne = function (model, query) {
      return Q.ninvoke(db[model], 'findOne', query);
    };

    db.update = function (model, query, body, options) {
      options = options || {};
      var deferred = Q.defer();

      db[model].update(query, body, options, function (err, numChanged, upsert) {
        if (numChanged > 0) {
          deferred.resolve();
        }
        else {
          deferred.reject(err);
        }
      });

      return deferred.promise;
    };

    db.remove = function (model, query) {
      return Q.ninvoke(db[model], 'remove', query);
    };
    
    return db;
  };

  return db || initDb();

}());