var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/timesheet.actions');
var SnackbarAction = require('../actions/snackbar.actions');
var agent = require('../util/agent.promise');
var assign = require('object-assign');
var LoginStore = require('./login.store');

var TimesheetStore = assign({}, Store, {

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
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
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

  list: function (payload) {
    var self = this;

    return agent.get(this.url())
      .query(payload.action.query)
      .end()
      .then(function (res) {
        self.setState({pageConfig: res.body});
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to retrieve timesheets.');
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
        SnackbarAction.error('There was an error getting the timesheet');
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
        SnackbarAction.success('Timesheet : ' + timesheet.name + ', updated.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error updating timesheet.');
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
        SnackbarAction.success('Timesheet : ' + res.body.name + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to delete timesheet.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = false;

    return agent.put(this.url(timesheet._id))
      .send(timesheet)
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        SnackbarAction.success('Timesheet : ' + res.body.name + ', was restored.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to restore timesheet.');
      });
  },

  create: function (payload) {
    var self = this;

    return agent.post(this.url())
      .send(payload.action.timesheet)
      .end()
      .then(function (res) {
        self.setState({timesheet: res.body});
        SnackbarAction.success('Timesheet : ' + res.body.name + ', created.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error creating timesheet.');
      });
  }
});

module.exports = TimesheetStore.initialize();
