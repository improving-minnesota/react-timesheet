var constants = require('../flux/flux.constants');
var dispatcher = require('../flux/flux.dispatcher');

var ProjectActions = {

  listProjects: function () {
    dispatcher.handleViewAction({
      actionType: constants.LIST_PROJECTS
    });
  },

  getProject: function (id) {
    dispatcher.handleViewAction({
      actionType: constants.GET_PROJECT,
      project: {_id: id}
    });
  },

  createProject: function (project) {
    dispatcher.handleViewAction({
      actionType: constants.CREATE_PROJECT,
      project: project
    });
  },

  updateProject: function (project) {
    dispatcher.handleViewAction({
      actionType: constants.UPDATE_PROJECT,
      project: project
    });
  },

  deleteProject: function (project) {
    dispatcher.handleViewAction({
      actionType: constants.DELETE_PROJECT,
      project: project
    });
  },

  restoreProject: function (project) {
    dispatcher.handleViewAction({
      actionType: constants.RESTORE_PROJECT,
      project: project
    });
  }
};

module.exports = ProjectActions;
