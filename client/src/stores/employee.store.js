var Store = require('../flux/flux.store');
var actions = require('../actions/employee.actions');
var axios = require('axios');
var assign = require('object-assign');
var _ = require('lodash');

var EmployeeStore = assign({}, Store, {

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
      employee: {},
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    return this;
  },

  url: function (employeeId) {
    var url = '/users';
    if (employeeId) {
      url += '/' + employeeId;
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
        console.log('Error attempting to retrieve employees.');
      });
  },

  get: function (payload) {
    var self = this;

    return axios.get(this.url(payload.action.employee._id))
      .then(function (res) {
        self.setState({employee: res.data});
        return true;
      })
      .catch(function (data) {
        console.log('There was an error getting the employee');
      });
  },

  update: function (payload) {
    var self = this;
    var employee = payload.action.employee;

    return axios.put(this.url(employee._id), employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + employee.username + ', updated.');
      })
      .catch(function (x) {
        console.log('There was an error updating employee.');
      });
  },

  remove: function (payload) {
    var self = this;
    var employee = payload.action.employee;
    employee.deleted = true;

    return axios.put(this.url(employee._id), employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + res.data.username + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to delete employee.');
      });
  },

  restore: function (payload) {
    var self = this;
    var employee = payload.action.employee;
    employee.deleted = false;

    return axios.put(this.url(employee._id), employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + res.data.username + ', was restored.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to restore employee.');
      });
  },

  create: function (payload) {
    var self = this;

    return axios.post(this.url(), payload.action.employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + res.data.username + ', created.');
      })
      .catch(function (x) {
        console.log('There was an error creating employee.');
      });
  }
});

module.exports = EmployeeStore.initialize();
