var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  Q = require('q'),
  db = require('../services/db.js'),
  _ = require('lodash');

var TimeunitsController = new Controller();

TimeunitsController.index = function () {
  var controller = this;
  var userId = controller.param('user_id');
  var timesheetId = controller.param('timesheet_id');
  var query = _.extend({timesheet_id: timesheetId}, controller.req.query);
  
  db.find('timeunits', query)
    .then(function (timeunits) {
      controller.res.json(timeunits);
    });
};

TimeunitsController.create = function () {
  var controller = this;

  db.insert('timeunits', controller.req.body)
    .then(function (timeunit) {
      controller.res.json(timeunit);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

TimeunitsController.show = function () {
  var controller = this;
  var id = this.param('id');

  db.findOne('timeunits', {_id: id})
    .then(function (timeunit) {
      controller.res.json(timeunit);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

TimeunitsController.update = function () {
  var controller = this;
  var id = this.param('id');

  db.update('timeunits', {_id: id}, controller.req.body)
    .then(function (timeunit) {
      controller.res.json(timeunit);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

TimeunitsController.destroy = function () {
  var controller = this;
  var id = this.param('id');

  db.remove('timeunits', {_id: id})
    .then(function () {
      controller.res.send(200);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

module.exports = TimeunitsController;