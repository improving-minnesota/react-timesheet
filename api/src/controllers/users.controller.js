var db = require('../services/db.js');

module.exports = {
  index: function (req, res, next) {
    var query = req.query;

    if (query.page) {
      
      db.page('users', query)
        .then(function (users) {
          res.json(users);
        })
        .fail(function (err) {
          res.status(500).json(err);
        });
    } else {
      
      db.find('users', query)
        .then(function (users) {
          res.json(users);
        })
        .fail(function (err) {
          res.status(500).json(err);
        });
    }
  },

  create: function (req, res, next) {

    db.insert('users', req.body)
      .then(function (user) {
        res.json(user);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  show: function (req, res, next) {
    var id = req.param.userId;

    db.findOne('users', {_id: id})
      .then(function (user) {
        res.json(user);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  update: function (req, res, next) {
    var id = req.param.userId;

    db.update('users', {_id: id}, req.body)
      .then(function (user) {
        res.json(user);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  },

  destroy: function (req, res, next) {
    var id = req.param.userId;

    db.remove('users', {_id: id})
      .then(function () {
        res.send(200);
      })
      .fail(function (err) {
        res.status(500).json(err);
      });
  }
};
