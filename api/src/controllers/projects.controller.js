var Q = require('q'),
  db = require('../services/db.js');

module.exports = {
  index: function (req, res, next) {
    
    var query = req.query;

    if (query.page) {
      
      db.page('projects', query)
        .then(function (projects) {
          res.json(projects);
        })
        .fail(function (err) {
          res.status(500).json(err);
        });
    } else {
      
      db.find('projects', query)
        .then(function (projects) {
          res.json(projects);
        })
        .fail(function (err) {
          res.status(500).json(err);
        });
    }
  },

  create: function (req, res, next) {

    db.insert('projects', req.body)
      .then(function (project) {
        res.json(project);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  show: function (req, res, next) {
    var id = this.param('id');

    db.findOne('projects', {_id: id})
      .then(function (project) {
        res.json(project);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  update: function (req, res, next) {
    var id = this.param('id');

    db.update('projects', {_id: id}, req.body)
      .then(function (project) {
        res.json(project);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  destroy: function (req, res, next) {
    var id = this.param('id');

    db.remove('projects', {_id: id})
      .then(function () {
        res.send(200);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  }
};
