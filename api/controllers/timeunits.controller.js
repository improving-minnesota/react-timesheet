var Q = require('q'),
  db = require('../services/db'),
  _ = require('lodash'),
  Boom = require('boom');

module.exports = {
  index: function (request, reply) {
    var timesheetId = request.params.timesheetId;
    var query = _.extend({timesheet_id: timesheetId}, request.query);

    db.find('timeunits', query)
      .then(reply);
  },

  create: function (request, reply) {

    db.insert('timeunits', request.payload)
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  show: function (request, reply) {
    var id = request.params.timeunitId;

    db.findOne('timeunits', {_id: id})
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  update: function (request, reply) {
    var id = request.params.timeunitId;

    db.update('timeunits', {_id: id}, request.payload)
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  destroy: function (request, reply) {
    var id = request.params.timeunitId;

    db.remove('timeunits', {_id: id})
      .then(function () {
        reply().code(204);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  }
};
