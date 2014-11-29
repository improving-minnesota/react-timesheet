var _ = require('lodash');
var store = require('../flux/flux.store');
var actions = require('../actions/timesheet.actions');
var notifications = require('../services/notifications');
var agent = require('../services/agent.promise');
var LoginStore = require('./login.store');

var TimesheetStore = _.extend(store, {

  initialize: function () {
    var events = {};
    events[actions.LIST]    = this.list;
    events[actions.GET]     = this.get;
    events[actions.UPDATE]  = this.update;
    events[actions.DELETE]  = this.remove;
    events[actions.RESTORE] = this.restore;
    events[actions.CREATE]  = this.create;
    this.register(events);

    this.setState({
      timesheet: {},
      timesheets: []
    });

    return this;
  },

  url: function (timesheetId) {
    var url = 'users/' + LoginStore.getUserId() + '/timesheets';
    if (timesheetId) {
      url += '/' + timesheetId;
    }

    return url;
  },

  list: function () {
    var self = this;

    return agent.get(this.url())
      .end()
      .then(function (res) {
        self.setState({timesheets: res.body});
      })
      .catch(function (x) {
        notifications.error('Error attempting to retrieve timesheets.');
      });
  },

  get: function (payload) {
    var self = this;

    return agent.get(this.url(payload.action.timesheet._id))
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        return true;
      })
      .catch(function (data) {
        notifications.error('There was an error getting the timesheet');
      });
  },

  update: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;

    return agent.put(this.url(timesheet._id))
      .send(timesheet)
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        notifications.success('Timesheet : ' + timesheet.name + ', updated.');
      })
      .catch(function (x) {
        notifications.error('There was an error updating timesheet.');
      });
  },

  remove: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = true;

    return agent.put(this.url(timesheet._id))
      .send(timesheet)
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        notifications.success('Timesheet : ' + res.body.name + ', was restored.');
        return true;
      })
      .catch(function (x) {
        notifications.error('Error attempting to delete timesheet.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = false;

    var prom = agent.put(this.url(timesheet._id))
      .send(timesheet)
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        notifications.success('Timesheet : ' + res.body.name + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        notifications.error('Error attempting to restore timesheet.');
      });

    return prom;
  },

  create: function (payload) {
    var self = this;

    return agent.post(this.url())
      .send(payload.action.timesheet)
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        notifications.success('Timesheet : ' + res.body.name + ', created.');
      })
      .catch(function (x) {
        notifications.error('There was an error creating timesheet.');
      });
  }
});

module.exports = TimesheetStore.initialize();
