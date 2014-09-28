var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var notifications = require('../services/notifications');

var ProjectsStore = merge(store.prototype, {
  
  initialize: function () {
    var config = {};
    config[constants.LIST_PROJECTS] = this.list;

    this.register(config);
    return this;
  },

  list: function () {
    var self = this;

    data.list('projects')
      .then(function (projects) {
        self.setState({projects: projects});
      })
      .catch(function (x) {
        notifications.error('Error attempting to retrieve projects.');
      });
  }

});

module.exports = ProjectsStore;