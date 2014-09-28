var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var merge = require('react/lib/merge');

var ProjectStore = merge(store.prototype, {
  
  initialize: function () {
    this.project = {};

    this.bindActions(
      constants.GET_PROJECT, this.get,
      constants.UPDATE_PROJECT, this.update,
      constants.DELETE_PROJECT, this.remove,
      constants.CREATE_PROJECT, this.create
    );
  },

  get: function (id) {

    this.emit('change');
  },

  update: function (employee) {
    // data.create('projects', $scope.project)
    //   .then(function (created) {
    //     notifications.success('Project : ' + created.username + ', created.');
    //     Router.transitionTo('app.projects.detail', {_id: created._id});
    //   })
    //   .catch(function (x) {
    //     notifications.error('There was an error creating project.');
    //   });

    this.emit('change');
  },

  remove: function (employee) {
    // data.remove('projects', project) 
    //   .then(function () {
    //     notifications.success('project : ' + project.username + ', was deleted.');
    //   })
    //   .catch(function (x) {
    //     project.deleted = false;
    //     notifications.error('Error attempting to delete project.');
    //   });

    this.emit('change');
  },

  restore: function (employee) {
    // data.restore('projects', project)
    //    .then(function (restored) {
    //      notifications.success('project was restored.');
    //    })
    //    .catch(function (x) {
    //      project.deleted = true;
    //      notifications.error('Error restoring project.');
    //    });
    this.emit('change');
  },

  create: function (create) {


    this.emit('change');
  },

  getState: function () {
    return {
      project: this.project
    };
  }

});

module.exports = ProjectStore;