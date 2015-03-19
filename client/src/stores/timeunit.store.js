var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/timeunit.actions');
var axios = require('axios');
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

    return axios.get(this.url(timesheet._id))
      .then(function (res) {
        self.setState({timeunits: res.data});
      })
      .catch(function (x) {
        console.log('Error attempting to retrieve logged hours.');
      });
  },

  get: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;

    return axios.get(this.url(timesheet._id, timeunit._id))
      .then(function (res) {
        self.setState({timeunit: res.data});
        return true;
      })
      .catch(function (data) {
        console.log('There was an error getting the time.');
      });
  },

  update: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;

    return axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        console.log('Your logged time has been updated.');
      })
      .catch(function (x) {
        console.log('There was an error updating time.');
      });
  },

  remove: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;
    timeunit.deleted = true;

    return axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        console.log('Your logged time was deleted.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to delete time.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    var timeunit = payload.action.timeunit;
    timeunit.deleted = false;

    var prom = axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        console.log('Your logged time was restored.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to restore time.');
      });

    return prom;
  },

  create: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;

    return axios.post(this.url(timesheet._id), payload.action.timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        console.log('Your time has been logged.');
      })
      .catch(function (x) {
        console.log('Error attempting to log your time.');
      });
  }
});

module.exports = TimeunitStore.initialize();
