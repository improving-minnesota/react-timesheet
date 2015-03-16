var React = window.React = require('react/addons');
var Router = require('react-router');
var routes = require('./routes');
var LoginStore = require('./stores/login.store');

// Set up the axios interceptors
require('./util/progress')();

// Attempt to get a current user session
LoginStore.current()
  .then(function () {

    // initialize the router and its routes
    Router.run(routes, function (Handler) {
      React.render(<Handler />, document.getElementById('app'));
    });
  });
