var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var notifications = require('../services/notifications');

// .add({
//   resource: 'projects',
//   params: ['_id']
// })

var ProjectStore = merge(store.prototype, {

  initialize: function () {
    var events = {};
    events[constants.GET_PROJECT] = this.get;
    events[constants.UPDATE_PROJECT] = this.update;
    events[constants.DELETE_PROJECT] = this.remove;
    events[constants.CREATE_PROJECT] = this.create;

    this.register(events);
    return this;
  },

  get: function (id) {
    var self = this;

    data.get('projects', {_id: payload.id})
      .then(function (project) {
        self.setState({project: project});
      })
      .catch(function (data) {
        notifications.error('There was an error getting the project');
      });
  },

  update: function (payload) {
    var self = this;

    data.update('projects', payload.project)
      .then(function (updated) {
        self.setState({project: updated});
        notifications.success('Project : ' + updated.name + ', updated.');
      })
      .catch(function (x) {
        notifications.error('There was an error updating project.');
      });
  },

  remove: function (payload) {
    var self = this;

    data.remove('projects', payload.project)
      .then(function (removed) {
        self.setState({project: removed});
        notifications.success('Project : ' + removed.name + ', was deleted.');
      })
      .catch(function (x) {
        notifications.error('Error attempting to delete project.');
      });
  },

  restore: function (payload) {
    var self = this;

    data.remove('projects', payload.project)
      .then(function (restored) {
        self.setState({project: restored});
        notifications.success('Project : ' + project.name + ', was deleted.');
      })
      .catch(function (x) {
        notifications.error('Error attempting to restore project.');
      });
  },

  create: function (payload) {
    var self = this;

    data.create('projects', payload.project)
      .then(function (created) {
        self.setState({project: created});
        notifications.success('Project : ' + created.name + ', created.');
      })
      .catch(function (x) {
        notifications.error('There was an error creating project.');
      });
  }
});

module.exports = ProjectStore;
