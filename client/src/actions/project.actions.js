var dispatcher = require('../flux/flux.dispatcher');

var ProjectActions = {

  LIST: 'LIST_PROJECTS',
  GET: 'GET_PROJECT',
  CREATE: 'CREATE_PROJECT',
  UPDATE: 'UPDATE_PROJECT',
  DELETE: 'DELETE_PROJECT',
  RESTORE: 'RESTORE_PROJECT',

  list: function (query) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.LIST,
      query: query
    });
  },

  get: function (id) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.GET,
      project: {_id: id}
    });
  },

  create: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.CREATE,
      project: project
    });
  },

  update: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.UPDATE,
      project: project
    });
  },

  remove: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.DELETE,
      project: project
    });
  },

  restore: function (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.RESTORE,
      project: project
    });
  }
};

module.exports = ProjectActions;
