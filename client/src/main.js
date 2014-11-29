/** @jsx React.DOM */

var React = window.React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var LoginStore = require('./stores/login.store');

// Attempt to get a current user session
LoginStore.current()
  .then(function () {

    // initialize the router and its routes
    Router.run(routes, function (Handler) {
      React.render(<Handler />, document.getElementById('app'));
    });
  });
