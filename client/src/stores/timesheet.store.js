var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/timesheet.actions');
var axios = require('axios');
var assign = require('object-assign');

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
    var url = 'users/all/timesheets';
    if (timesheetId) {
      url += '/' + timesheetId;
    }

    return url;
  },

  list: function (payload) {
    var self = this;

    return axios.get(this.url(), {params: payload.action.query})
      .then(function (res) {
        self.setState({pageConfig: res.data});
      })
      .catch(function (x) {
        console.log('Error attempting to retrieve timesheets.');
      });
  },

  get: function (payload) {
    var self = this;

    return axios.get(this.url(payload.action.timesheet._id))
      .then(function (res) {
        self.setState({timesheet: res.data});
        return true;
      })
      .catch(function (data) {
        console.log('There was an error getting the timesheet');
      });
  },

  update: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', updated.');
      })
      .catch(function (x) {
        console.log('There was an error updating timesheet.');
      });
  },

  remove: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = true;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to delete timesheet.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = false;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', was restored.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to restore timesheet.');
      });
  },

  create: function (payload) {
    var self = this;

    return axios.post(this.url(), payload.action.timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', created.');
      })
      .catch(function (x) {
        console.log('There was an error creating timesheet.');
      });
  }
});

module.exports = TimesheetStore.initialize();
