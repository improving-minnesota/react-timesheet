var React = require('react/addons');
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

var TimeunitsCreate = require('./components/timeunits/timeunit.create');
var TimeunitsEdit = require('./components/timeunits/timeunit.detail');

// Initialize the routes
module.exports = (
  <Route name="index" path="/" handler={Index}>

    <Route name='app' path="/" handler={App}>

      <Route name='projects'          path='/projects'              handler={Projects} />
      <Route name='projects.detail'   path='/projects/detail/:_id'  handler={ProjectsDetail} />
      <Route name='projects.create'   path='/projects/create'       handler={ProjectsCreate} />

      <Route name='employees'         path='/employees'             handler={Employees} />
      {/* TODO - Add the employee detail and create routes*/}
      
      <Route name='timesheets'        path='/employees/:user_id/timesheets'             handler={Timesheets} />
      {/* TODO - Add the timesheets detail and create routes */}

      {/* TODO - Add the timeunits detail and create routes*/}
      
      <Redirect to="employees" />
    </Route>

  </Route>
);
