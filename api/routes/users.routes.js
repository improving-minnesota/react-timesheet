'use strict';

var usersController = require('../controllers/users.controller'),
  timesheetsController = require('../controllers/timesheets.controller'),
  timeunitsController = require('../controllers/timeunits.controller');

exports.register = function (server, options, next) {

  var users =         '/users';
  var userId =        '/users/{userId}';
  var timesheets =    '/users/{userId}/timesheets';
  var timesheetId =   '/users/{userId}/timesheets/{timesheetId}';
  var timeunits =     '/users/{userId}/timesheets/{timesheetId}/timeunits';
  var timeunitId =    '/users/{userId}/timesheets/{timesheetId}/timeunits/{timeunitId}';

  server.route([
    {method: 'GET',     path: users, handler: usersController.index},
    {method: 'POST',    path: users, handler: usersController.create},
    {method: 'GET',     path: userId, handler: usersController.show},
    {method: 'PUT',     path: userId, handler: usersController.update},
    {method: 'DELETE',  path: userId, handler: usersController.destroy}
  ]);

  server.route([
    {method: 'GET',     path: timesheets, handler: timesheetsController.index},
    {method: 'POST',    path: timesheets, handler: timesheetsController.create},
    {method: 'GET',     path: timesheetId, handler: timesheetsController.show},
    {method: 'PUT',     path: timesheetId, handler: timesheetsController.update},
    {method: 'DELETE',  path: timesheetId, handler: timesheetsController.destroy}
  ]);

  server.route([
    {method: 'GET',     path: timeunits, handler: timeunitsController.index},
    {method: 'POST',    path: timeunits, handler: timeunitsController.create},
    {method: 'GET',     path: timeunitId, handler: timeunitsController.show},
    {method: 'PUT',     path: timeunitId, handler: timeunitsController.update},
    {method: 'DELETE',  path: timeunitId, handler: timeunitsController.destroy}
  ]);

  return next();
};

exports.register.attributes = {
  name: 'user-routes',
  version: '0.0.1'
};
