var dispatcher = require('../flux/flux.dispatcher');

var ProjectActions = {

  LIST: 'LIST_PROJECTS',
  GET: 'GET_PROJECT',
  CREATE: 'CREATE_PROJECT',
  UPDATE: 'UPDATE_PROJECT',
  DELETE: 'DELETE_PROJECT',
  RESTORE: 'RESTORE_PROJECT',

  listProjects: function () {
    dispatcher.handleViewAction({
      actionType: ProjectActions.LIST_PROJECTS
    });
  },

  getProject: function (id) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.GET_PROJECT,
      project: {_id: id}
    });
  },

  createProject: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.CREATE_PROJECT,
      project: project
    });
  },

  updateProject: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.UPDATE_PROJECT,
      project: project
    });
  },

  deleteProject: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.DELETE_PROJECT,
      project: project
    });
  },

  restoreProject: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.RESTORE_PROJECT,
      project: project
    });
  }
};

module.exports = ProjectActions;
