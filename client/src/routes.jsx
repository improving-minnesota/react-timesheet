var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/app');

var Projects = require('./components/projects/projects');
var Employees = require('./components/employees/employees');
var Timesheets = require('./components/timesheets/timesheets');

// Initialize the routes
module.exports = (
  <Route name='app' path="/" handler={App}>

    <Route name='projects'   path='/projects'  handler={Projects} />
    <Route name='employees'  path='/employees' handler={Employees} />
    <Route name='timesheets' path='/employees/:user_id/timesheets' handler={Timesheets} />
    
    <Redirect to="employees" />
  </Route>
);
