var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var notifications = require('../services/notifications');

var TimeunitStore = merge(store.prototype, {

  initialize: function () {

    this.bindActions(
      constants.UPDATE_TIMEUNIT, this.update,
      constants.DELETE_TIMEUNIT, this.remove,
      constants.CREATE_TIMEUNIT, this.create
    );
  },

  update: function (timeunit) {


    this.emit('change');
  },

  remove: function (timeunit) {
    var self = this;

    data.remove('timeunits', timeunit)
      .then(function () {
        //notifications.success('timeunit : ' + timeunit.username + ', was deleted.');
      })
      .catch(function (x) {
        self.timeunit.deleted = false;
        //notifications.error('Error attempting to delete timeunit.');
      })
      .finally(function () {
        this.emit('change');
      });
  },

  restore: function (timeunit) {
    var self = this;

    data.restore('timeunits', timeunit)
      .then(function (restored) {
        //notifications.success('timeunit was restored.');
      })
      .catch(function (x) {
        self.timeunit.deleted = true;
        //notifications.error('Error restoring timeunit.');
      })
      .finally(function () {
        this.emit('change');
      });
  },

  create: function (timeunit) {
    data.create('timeunits', timeunit)
      .then(function (created) {

      })
      .catch(function (x) {

      })
      .finally(function () {
        this.emit('change');
      });
  },

  getState: function () {
    return {
      timeunit: this.timeunit
    };
  }

});

module.exports = TimeunitStore;
