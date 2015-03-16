var React = window.React = require('react/addons');
var Router = require('react-router');
var routes = require('./routes');
var LoginStore = require('./stores/login.store');

// TODO - Secure the UI

// initialize the router and its routes
Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
