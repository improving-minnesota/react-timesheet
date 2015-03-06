var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/timeunit.actions');
var SnackbarAction = require('../actions/snackbar.actions');
var agent = require('../util/agent.promise');
var assign = require('object-assign');
var LoginStore = require('./login.store');

var TimeunitStore = assign({}, Store, {

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
      timeunit: {},
      timeunits: []
    });

    return this;
  },

  url: function (timesheetId, timeunitId) {
    var userId = LoginStore.getState().user._id || 'all';
    var url = '/users/' + userId + '/timesheets/' + timesheetId + '/timeunits';
    if (timeunitId) {
      url += '/' + timeunitId;
    }
    return url;
  },

  list: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;

    return agent.get(this.url(timesheet._id))
      .end()
      .then(function (res) {
        self.setState({timeunits: res.body});
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to retrieve timeunits.');
      });
  },

  get: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;

    return agent.get(this.url(timesheet._id, timeunit._id))
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        return true;
      })
      .catch(function (data) {
        SnackbarAction.error('There was an error getting the timeunit');
      });
  },

  update: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;

    return agent.put(this.url(timesheet._id, timeunit._id))
      .send(timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        SnackbarAction.success('Timeunit : ' + timeunit.username + ', updated.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error updating timeunit.');
      });
  },

  remove: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;
    timeunit.deleted = true;

    return agent.put(this.url(timesheet._id, timeunit._id))
      .send(timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        SnackbarAction.success('Timeunit : ' + res.body.username + ', was restored.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to delete timeunit.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;
    timeunit.deleted = false;

    var prom = agent.put(this.url(timesheet._id, timeunit._id))
      .send(timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        SnackbarAction.success('Timeunit : ' + res.body.username + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to restore timeunit.');
      });

    return prom;
  },

  create: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;

    return agent.post(this.url(timesheet._id))
      .send(payload.action.timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        SnackbarAction.success('Timeunit : ' + res.body.username + ', created.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error creating timeunit.');
      });
  }
});

module.exports = TimeunitStore.initialize();
