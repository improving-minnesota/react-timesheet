var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var actions = require('../actions/timeunit.actions');
var notifications = require('../services/notifications');
var agent = require('../services/agent.promise');

var TimeunitStore = merge(store, {

  initialize: function () {
    this.url = '/users';

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

  list: function () {
    var self = this;

    return agent.get(this.url)
      .end()
      .then(function (res) {
        self.setState({timeunits: res.body});
      })
      .catch(function (x) {
        notifications.error('Error attempting to retrieve timeunits.');
      });
  },

  get: function (payload) {
    var self = this;

    return agent.get(this.url + '/' + payload.action.timeunit._id)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        return true;
      })
      .catch(function (data) {
        notifications.error('There was an error getting the timeunit');
      });
  },

  update: function (payload) {
    var self = this;
    var timeunit = payload.action.timeunit;

    return agent.put(this.url + '/' + timeunit._id)
      .send(timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        notifications.success('Timeunit : ' + timeunit.username + ', updated.');
      })
      .catch(function (x) {
        notifications.error('There was an error updating timeunit.');
      });
  },

  remove: function (payload) {
    var self = this;
    var timeunit = payload.action.timeunit;
    timeunit.deleted = true;

    return agent.put(this.url + '/' + timeunit._id)
      .send(timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        notifications.success('Timeunit : ' + res.body.username + ', was restored.');
        return true;
      })
      .catch(function (x) {
        notifications.error('Error attempting to delete timeunit.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timeunit = payload.action.timeunit;
    timeunit.deleted = false;

    var prom = agent.put(this.url + '/' +timeunit._id)
      .send(timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        notifications.success('Timeunit : ' + res.body.username + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        notifications.error('Error attempting to restore timeunit.');
      });

    return prom;
  },

  create: function (payload) {
    var self = this;

    return agent.post(this.url)
      .send(payload.action.timeunit)
      .end()
      .then(function (res) {
        self.setState({timeunit: res.body});
        notifications.success('Timeunit : ' + res.body.username + ', created.');
      })
      .catch(function (x) {
        notifications.error('There was an error creating timeunit.');
      });
  }
});

module.exports = EmployeeStore.initialize();
