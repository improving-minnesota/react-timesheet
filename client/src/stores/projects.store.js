var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var merge = require('react/lib/merge');

var ProjectsStore = merge(store.prototype, {
  
  initialize: function () {
    this.projects = [];

    this.bindActions(
      constants.LIST_PROJECTS, this.list
    );
  },

  list: function () {
    // var query = {
    //   page: page || $scope.pageConfig.page,
    //   sort: {username: 1}
    // };

    // data.page('projects', query)
    //   .then(function (pageConfig) {
    //     $scope.pageConfig = pageConfig;
    //   });

    this.emit('change');
  },

  getState: function () {
    return {
      projects: this.projects
    };
  }

});

module.exports = ProjectsStore;