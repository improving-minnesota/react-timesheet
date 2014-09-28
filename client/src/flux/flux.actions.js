var constants = require('./flux.constants');

module.exports = {

  timesheets: {
    list: function () {
      this.dispatch(constants.LIST_TIMESHEETS);
    },

    get: function (id) {
      this.dispatch(constants.GET_TIMESHEET, id);
    },

    update: function (timesheet) {
      this.dispatch(constants.UPDATE_TIMESHEET, timesheet);
    },

    remove: function (timesheet) {
      this.dispatch(constants.DELETE_TIMESHEET, timesheet);
    },

    create: function (timesheet) {
      this.dispatch(constants.CREATE_TIMESHEET, timesheet);
    }
  },

  timeunits: {
    list: function () {
      this.dispatch(constants.LIST_TIMEUNITS);
    },

    get: function (id) {
      this.dispatch(constants.GET_TIMEUNIT, id);
    },

    update: function (timeunit) {
      this.dispatch(constants.UPDATE_TIMEUNIT, timeunit);
    },

    remove: function (timeunit) {
      this.dispatch(constants.DELETE_TIMEUNIT, timeunit);
    },

    create: function (timeunit) {
      this.dispatch(constants.CREATE_TIMEUNIT, timeunit);
    }
  },

  projects: {
    list: function () {
      this.dispatch(constants.LIST_PROJECTS);
    },

    get: function (id) {
      this.dispatch(constants.GET_PROJECT, id);
    },

    update: function (project) {
      this.dispatch(constants.UPDATE_PROJECT, project);
    },

    remove: function (project) {
      this.dispatch(constants.DELETE_PROJECT, project);
    },

    create: function (project) {
      this.dispatch(constants.CREATE_PROJECT, project);
    }
  },

  employees: {
    list: function () {
      this.dispatch(constants.LIST_EMPLOYEES);
    },

    get: function (id) {
      this.dispatch(constants.GET_EMPLOYEE, id);
    },

    update: function (employee) {
      this.dispatch(constants.UPDATE_EMPLOYEE, employee);
    },

    remove: function (employee) {
      this.dispatch(constants.DELETE_EMPLOYEE, employee);
    },

    create: function (employee) {
      this.dispatch(constants.CREATE_EMPLOYEE, employee);
    }
  }
};