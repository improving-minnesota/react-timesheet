/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;

var app = require('./components/app');
var login = require('./components/login/login');

var projects = require('./components/projects/projects');
var projectsDetail = require('./components/projects/project.detail');
var projectsCreate = require('./components/projects/project.create');

var employees = require('./components/employees/employees');
var employeesDetail = require('./components/employees/employee.detail');
var employeesCreate = require('./components/employees/employee.create');

var timesheets = require('./components/timesheets/timesheets');
var timesheetsDetail = require('./components/timesheets/timesheet.detail');
var timesheetsCreate = require('./components/timesheets/timesheet.create');
var timesheetsEdit = require('./components/timesheets/timesheet.edit');

var timeunitsCreate = require('./components/timeunits/timeunit.create');
var timeunitsEdit = require('./components/timeunits/timeunit.edit');

// Initialize the routes
var AppRoutes = React.createClass({
  mixins: [
    Router.ActiveState
  ],

  render : function () {

    return (
       <Routes>
        <Route name='login' path='/login' handler={login} />
        <Route name='app' path='/' handler={app}>

          <Route name='projects' path='/projects' handler={projects} />
          <Route name='projects.detail' path='/projects/detail/:_id' handler={projectsDetail} />
          <Route name='projects.create' path='/projects/create' handler={projectsCreate} />

          <Route name='employees' path='/employees' handler={employees} />
          <Route name='employees.detail' path='/employees/detail/:_id' handler={employeesDetail} />
          <Route name='employees.create' path='/employees/create' handler={employeesCreate} />

          <Route name='timesheets' path='/users/:user_id/timesheets' handler={timesheets} />
          <Route name='timesheets.create' path='/users/:user_id/timesheets/create' handler={timesheetsCreate} />
          <Route name='timesheets.detail' path='/users/:user_id/timesheets/detail/:_id' handler={timesheetsDetail} />
          <Route name='timesheets.detail.edit' path='/users/:user_id/timesheets/detail/:_id/edit' handler={timesheetsEdit} />

          <Route name='timesheets.detail.timeunits.create' path='/users/:user_id/timesheets/detail/:_id/timeunits/create' handler={timeunitsCreate} />
          <Route name='timesheets.detail.timeunits.edit'path='/users/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id' handler={timeunitsEdit} />

          <Redirect from="app" to="employees" />
          <NotFoundRoute handler={employees} />
        </Route>
      </Routes>
    );
  }
});

module.exports = AppRoutes;
