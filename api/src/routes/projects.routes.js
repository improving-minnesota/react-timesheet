'use strict';

var projectsController = require('../controllers/projects.controller'),
  router = require('express').Router();

module.exports = function (app) {

  router.route('/projects')
    .get(projectsController.index)
    .post(projectsController.create);

  router.route('/projects/:projectId')
    .get(projectsController.show)
    .put(projectsController.update)
    .delete(projectsController.destroy);

  return router;
};
