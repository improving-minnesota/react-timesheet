/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Routes = require('react-router').Routes;
var Route = require('react-router').Route;

var app = require('./app/app');
var projects = require('./app/projects/projects');
var projectsDetail = require('./app/projects/project.detail');
var projectsCreate = require('./app/projects/project.create');

var employees = require('./app/employees/employees');
var employeesDetail = require('./app/employees/employee.detail');
var employeesCreate = require('./app/employees/employee.create');

var timesheets = require('./app/timesheets/timesheets');
var timesheetsDetail = require('./app/timesheets/timesheet.detail');
var timesheetsCreate = require('./app/timesheets/timesheet.create');
var timesheetsEdit = require('./app/timesheets/timesheet.edit');

var timeunitsCreate = require('./app/timesheets/timeunits/timeunit.create');
var timeunitsEdit = require('./app/timesheets/timeunits/timeunit.edit');

// Initialize the routes
var AppRoutes = React.createClass({
  mixins: [
    Router.ActiveState
  ],

  render : function () {

    return (
       <Routes>
        <Route handler={app}> 
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
        </Route>
      </Routes>
    );
  }
});

module.exports = AppRoutes;
