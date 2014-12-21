'use strict';

var projectsController = require('../controllers/projects.controller');

module.exports = function (server) {

  var projects =  '/projects';
  var projectId = '/projects/{projectId}';

  server.route([
    {method: 'GET',     path: projects, handler: projectsController.index},
    {method: 'POST',    path: projects, handler: projectsController.create},
    {method: 'GET',     path: projectId, handler: projectsController.show},
    {method: 'PUT',     path: projectId, handler: projectsController.update},
    {method: 'DELETE',  path: projectId, handler: projectsController.destroy}
  ]);

};
