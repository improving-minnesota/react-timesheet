var Q = require('q'),
  db = require('../services/db'),
  _ = require('lodash');

module.exports = {
  index: function (req, res, next) {
    var userId = req.params.userId;
    var query = req.query;

    if (userId && userId !== 'all') {
      query = _.extend({user_id: userId}, query);
    }

    if (query.page) {
      db.page('timesheets', query)
        .then(function (timesheets) {
          res.json(timesheets);
        })
        .fail(function (err) {
          res.status(500).json(err);
        });
    }
    else {
      db.find('timesheets', query)
        .then(function (timesheets) {
          res.json(timesheets);
        })
        .fail(function (err) {
          res.status(500).json(err);
        });
    }
  },

  create: function (req, res, next) {
    var userId = req.params.userId;

    var newTimesheet = req.body;
    newTimesheet.user_id = userId;

    db.insert('timesheets', newTimesheet)
      .then(function (){
        res.json(newTimesheet);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  show: function (req, res, next) {
    var userId = req.params.userId;
    var id = req.params.timesheetId;

    db.findOne('timesheets', {user_id: userId, _id: id})
      .then(function (timesheet) {
        res.json(timesheet);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  update: function (req, res, next) {
    var id = req.params.timesheetId;

    db.update('timesheets', {_id: id}, req.body)
      .then(function (timesheet) {
        res.json(timesheet);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  destroy: function (req, res, next) {
    var id = req.params.timesheetId;

    db.remove('timesheets', {_id: id})
      .then(function () {
        res.send(204);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  }
};
