var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/project.actions');
var SnackbarAction = require('../actions/snackbar.actions');
var agent = require('../util/agent.promise');

var ProjectStore = _.extend(_.clone(Store), {

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
      project: {},
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    return this;
  },

  url: function (projectId) {
    var url = '/projects';
    if (projectId) {
      url += '/' + projectId;
    }

    return url;
  },

  // page = page number
  // sort = property to sort on
  // returns totalItems
  list: function (payload) {
    var self = this;

    return agent.get(this.url())
      .query(payload.action.query)
      .end()
      .then(function (res) {
        self.setState({pageConfig: res.body});
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to retrieve projects.');
      });
  },

  get: function (payload) {
    var self = this;

    return agent.get(this.url(payload.action.project._id))
      .end()
      .then(function (res) {
        self.setState({project: res.body});
        return true;
      })
      .catch(function (data) {
        SnackbarAction.error('There was an error getting the project');
      });
  },

  update: function (payload) {
    var self = this;
    var project = payload.action.project;

    return agent.put(this.url(project._id))
      .send(project)
      .end()
      .then(function (res) {
        self.setState({project: res.body});
        SnackbarAction.success('Project : ' + project.name + ', updated.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error updating project.');
      });
  },

  remove: function (payload) {
    var self = this;
    var project = payload.action.project;
    project.deleted = true;

    return agent.put(this.url(project._id))
      .send(project)
      .end()
      .then(function (res) {
        self.setState({project: res.body});
        SnackbarAction.success('Project : ' + res.body.name + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to delete project.');
      });
  },

  restore: function (payload) {
    var self = this;
    var project = payload.action.project;
    project.deleted = false;

    var prom = agent.put(this.url(project._id))
      .send(project)
      .end()
      .then(function (res) {
        self.setState({project: res.body});
        SnackbarAction.success('Project : ' + res.body.name + ', was restored.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to restore project.');
      });

    return prom;
  },

  create: function (payload) {
    var self = this;

    return agent.post(this.url())
      .send(payload.action.project)
      .end()
      .then(function (res) {
        self.setState({project: res.body});
        SnackbarAction.success('Project : ' + res.body.name + ', created.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error creating project.');
      });
  }
});

module.exports = ProjectStore.initialize();
