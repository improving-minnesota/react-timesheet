'use strict';

var usersController = require('../controllers/users.controller'),
  timesheetsController = require('../controllers/timesheets.controller'),
  timeunitsController = require('../controllers/timeunits.controller'),
  router = require('express').Router();

module.exports = function (app) {

  router.route('/users')
    .get(usersController.index)
    .post(usersController.create);

  router.route('/users/:userId')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

  router.route('/users/:userId/timesheets')
    .get(timesheetsController.index)
    .post(timesheetsController.create);

  router.route('/users/:userId/timesheets/:timesheetId')
    .get(timesheetsController.show)
    .put(timesheetsController.update)
    .delete(timesheetsController.destroy);

  router.route('/users/:userId/timesheets/:timesheetId/timeunits')
    .get(timeunitsController.index)
    .post(timeunitsController.create);

  router.route('/users/:userId/timesheets/:timesheetId/timeunits/:timeunitId')
    .get(timeunitsController.show)
    .put(timeunitsController.update)
    .delete(timeunitsController.destroy);

  return router;
};
