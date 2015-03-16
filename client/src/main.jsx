var React = require('react/addons');
var Router = require('react-router');
var routes = require('./routes');

// initialize the router and its routes
Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
