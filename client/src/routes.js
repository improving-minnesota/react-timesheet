/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Index = require('./components/index');
var App = require('./components/app');
var Login = require('./components/login/login');

var Projects = require('./components/projects/projects');
var ProjectsDetail = require('./components/projects/project.detail');
var ProjectsCreate = require('./components/projects/project.create');

var Employees = require('./components/employees/employees');
var EmployeesDetail = require('./components/employees/employee.detail');
var EmployeesCreate = require('./components/employees/employee.create');

var Timesheets = require('./components/timesheets/timesheets');
var TimesheetsDetail = require('./components/timesheets/timesheet.detail');
var TimesheetsCreate = require('./components/timesheets/timesheet.create');
var TimesheetsEdit = require('./components/timesheets/timesheet.edit');

var TimeunitsCreate = require('./components/timeunits/timeunit.create');
var TimeunitsEdit = require('./components/timeunits/timeunit.edit');

// Initialize the routes
module.exports = (
  <Route name="index" path="/" handler={Index}>
    <Route name='login' path='/login' handler={Login} />

    <Route name='app' path="/" handler={App}>

      <Route name='projects'                path='/projects'              handler={Projects} />
      <Route name='projects.detail'         path='/projects/detail/:_id'  handler={ProjectsDetail} />
      <Route name='projects.create'         path='/projects/create'       handler={ProjectsCreate} />

      <Route name='employees'               path='/employees'             handler={Employees} />
      <Route name='employees.detail'        path='/employees/detail/:_id' handler={EmployeesDetail} />
      <Route name='employees.create'        path='/employees/create'      handler={EmployeesCreate} />

      <Route name='timesheets'              path='/employees/:user_id/timesheets'                   handler={Timesheets} />
      <Route name='timesheets.create'       path='/employees/:user_id/timesheets/create'            handler={TimesheetsCreate} />
      <Route name='timesheets.detail'       path='/employees/:user_id/timesheets/detail/:_id'       handler={TimesheetsDetail} />
      <Route name='timesheets.detail.edit'  path='/employees/:user_id/timesheets/detail/:_id/edit'  handler={TimesheetsEdit} />

      <Route name='timesheets.detail.timeunits.create' path='/employees/:user_id/timesheets/detail/:_id/timeunits/create'            handler={TimeunitsCreate} />
      <Route name='timesheets.detail.timeunits.edit'   path='/employees/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id' handler={TimeunitsEdit} />

      <Redirect from="index" to="employees" />
      <Redirect from="app" to="employees" />
      <DefaultRoute handler={Projects} />
      <NotFoundRoute handler={Projects} />
    </Route>
  </Route>
);
