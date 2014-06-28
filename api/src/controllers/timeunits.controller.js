var Q = require('q'),
  db = require('../services/db'),
  _ = require('lodash');

module.exports = {
  index: function (req, res, next) {
    var timesheetId = req.params.timesheetId;
    var query = _.extend({timesheet_id: timesheetId}, req.query);
    
    db.find('timeunits', query)
      .then(function (timeunits) {
        res.json(timeunits);
      });
  },

  create: function (req, res, next) {

    db.insert('timeunits', req.body)
      .then(function (timeunit) {
        res.json(timeunit);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  show: function (req, res, next) {
    var id = req.params.timeunitId;

    db.findOne('timeunits', {_id: id})
      .then(function (timeunit) {
        res.json(timeunit);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  update: function (req, res, next) {
    var id = req.params.timeunitId;

    db.update('timeunits', {_id: id}, req.body)
      .then(function (timeunit) {
        res.json(timeunit);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  destroy: function (req, res, next) {
    var id = req.params.timeunitId;

    db.remove('timeunits', {_id: id})
      .then(function () {
        res.send(200);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  }
};
