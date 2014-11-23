var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var notifications = require('../services/notifications');

// .add({
//   resource: 'timesheets',
//   url: '/users/:user_id/timesheets',
//   params: ['_id', 'user_id']
// });

var TimesheetStore = merge(store.prototype, {

  initialize: function () {
    this.timesheet = {};

    this.bindActions(
      constants.GET_TIMESHEET, this.get,
      constants.UPDATE_TIMESHEET, this.update,
      constants.DELETE_TIMESHEET, this.remove,
      constants.CREATE_TIMESHEET, this.create
    );
  },

  get: function (id) {

    this.emit('change');
  },

  update: function (employee) {

    this.emit('change');
  },

  remove: function (employee) {
    // data.remove('timesheets', timesheet)
    //   .then(function () {
    //     notifications.success('timesheet : ' + timesheet.username + ', was deleted.');
    //   })
    //   .catch(function (x) {
    //     timesheet.deleted = false;
    //     notifications.error('Error attempting to delete timesheet.');
    //   });

    this.emit('change');
  },

  restore: function (employee) {
    // data.restore('timesheets', timesheet)
   //    .then(function (restored) {
   //      notifications.success('timesheet was restored.');
   //    })
   //    .catch(function (x) {
   //      timesheet.deleted = true;
   //      notifications.error('Error restoring timesheet.');
   //    });

    this.emit('change');
  },

  create: function (create) {


    this.emit('change');
  },

  getState: function () {
    return {
      timesheet: this.timesheet
    };
  }

});

module.exports = TimesheetStore;
