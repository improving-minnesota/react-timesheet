var Q = require('q'),
  db = require('../services/db'),
  Boom = require('boom');

module.exports = {
  index: function (request, reply) {

    var query = request.query;

    if (query.page) {

      db.page('projects', query)
        .then(reply)
        .fail(function (err) {
          reply(Boom.badImplementation(err));
        });
    } else {

      db.find('projects', query)
        .then(function (projects) {
          reply(projects);
        })
        .fail(function (err) {
          reply(Boom.badImplementation(err));
        });
    }
  },

  create: function (request, reply) {

    db.insert('projects', request.payload)
      .then(function (project) {
        reply(project);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  show: function (request, reply) {
    var id = request.params.projectId;

    db.findOne('projects', {_id: id})
      .then(function (project) {
        reply(project);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  update: function (request, reply) {
    var id = request.params.projectId;

    db.update('projects', {_id: id}, request.payload)
      .then(function (project) {
        reply(project);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  destroy: function (request, reply) {
    var id = request.params.projectId;

    db.remove('projects', {_id: id})
      .then(function () {
        reply().code(200);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  }
};
