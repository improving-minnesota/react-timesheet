/** @jsx React.DOM */

var React = window.React = require('react');
var AppRouter = require('./routes');
var LoginStore = require('./stores/login.store');

// Attempt to get a current user session
LoginStore.current()
  .then(function () {
    // Initialize the application routes
    React.renderComponent(<AppRouter />, document.getElementById('app'));
  });
