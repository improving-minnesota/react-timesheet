var Fluxxor = require('fluxxor');
var constants = require('../flux/flux.constants');

var projects = require('../../../api/data/projects.json');

var TimesheetStore = Fluxxor.createStore({
  
  actions: {
    constants.UPDATE_PROJECT: 'update',
    constants.DELETE_PROJECT: 'remove',
    constants.CREATE_PROJECT: 'create'
  },

  initialize: function () {
    this.projects = [];
  },

  update: function (employee) {

    this.emit('change');
  },

  remove: function (employee) {


    this.emit('change');
  },

  create: function (create) {


    this.emit('change');
  },

  getState: function () {
    return {
      projects: projects;
    };
  }

});

module.exports = TimesheetStore;