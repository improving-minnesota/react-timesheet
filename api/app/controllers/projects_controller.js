var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  Q = require('q'),
  db = require('../services/db.js');

var ProjectsController = new Controller();

ProjectsController.index = function () {
  var controller = this;
  
   var query = controller.req.query;

  if (query.page) {
    
    db.page('projects', query)
      .then(function (projects) {
        controller.res.json(projects);
      })
      .fail(function (err) {
        controller.res.status(500).json(err);
      });
  } else {
    
    db.find('projects', query)
      .then(function (projects) {
        controller.res.json(projects);
      })
      .fail(function (err) {
        controller.res.status(500).json(err);
      });
  }
};

ProjectsController.create = function () {
  var controller = this;

  db.insert('projects', controller.req.body)
    .then(function (project) {
      controller.res.json(project);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

ProjectsController.show = function () {
  var controller = this;
  var id = this.param('id');

  db.findOne('projects', {_id: id})
    .then(function (project) {
      controller.res.json(project);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

ProjectsController.update = function () {
  var controller = this;
  var id = this.param('id');

  db.update('projects', {_id: id}, controller.req.body)
    .then(function (project) {
      controller.res.json(project);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

ProjectsController.destroy = function () {
  var controller = this;
  var id = this.param('id');

  db.remove('projects', {_id: id})
    .then(function () {
      controller.res.send(200);
    })
    .fail(function (err) {
      controller.res.status(500).json(err);
    });
};

module.exports = ProjectsController;