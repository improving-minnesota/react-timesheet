var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  Q = require('q'),
  db = require('../services/db.js'),
  _ = require('lodash');

var TimesheetsController = new Controller();

TimesheetsController.index = function () {
  var controller = this;
  var userId = controller.param('user_id');
  var query = controller.req.query;

  if (userId && userId !== 'all') {
    query = _.extend({user_id: userId}, query);
  }

  if (query.page) {
    db.page('timesheets', query)
      .then(function (timesheets) {
        controller.res.json(timesheets);
      })
      .fail(function (err) {
        controller.res.status(500).json(err);
      });
  }
  else {
    db.find('timesheets', query)
      .then(function (timesheets) {
        controller.res.json(timesheets);
      })
      .fail(function (err) {
        controller.res.status(500).json(err);
      });
  }
};

TimesheetsController.create = function () {
  var controller = this;
  var userId = controller.param("user_id");

  var newTimesheet = controller.req.body;
  newTimesheet.user_id = userId;

  db.insert('timesheets', newTimesheet)
    .then(function (){
      controller.res.json(newTimesheet);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

TimesheetsController.show = function () {
  var controller = this;
  var userId = controller.param('user_id');
  var id = controller.param('id');

  db.findOne('timesheets', {user_id: userId, _id: id})
    .then(function (timesheet) {
      controller.res.json(timesheet);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

TimesheetsController.update = function () {
  var controller = this;
  var id = this.param('id');

  db.update('timesheets', {_id: id}, controller.req.body)
    .then(function (timesheet) {
      controller.res.json(timesheet);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

TimesheetsController.destroy = function () {
  var controller = this;
  var id = this.param('id');

  db.remove('timesheets', {_id: id})
    .then(function () {
      controller.res.send(204);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

module.exports = TimesheetsController;