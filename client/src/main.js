/** @jsx React.DOM */

var React = require('react');
var Routes = require('react-router').Routes;
var Route = require('react-router').Route;

// Initialize the rest api
require('./data/resources')();

// Initialize the routes
var App = require('./app/app');

var Projects = require('./app/projects/projects');
var ProjectDetail = require('./app/projects/project.detail');
var ProjectCreate = require('./app/projects/project.create');

var Employees = require('./app/employees/employees');
var EmployeeDetail = require('./app/employees/employee.detail');
var EmployeeCreate = require('./app/employees/employee.create');

var Timesheets = require('./app/timesheets/timesheets');
var TimesheetDetail = require('./app/timesheets/timesheet.detail');
var TimesheetCreate = require('./app/timesheets/timesheet.create');
var TimesheetEdit = require('./app/timesheets/timesheet.edit');

var TimeunitCreate = require('./app/timesheets/timeunits/timeunit.create');
var TimeunitEdit = require('./app/timesheets/timeunits/timeunit.edit');


React.renderComponent((
  Routes({},
    Route({handler: App}, 

      // projects
      Route({
        name: 'projects', 
        path: '/projects', 
        handler: Projects
      }),
      Route({
        name: 'projects.detail', 
        path: '/projects/detail/:_id', 
        handler: ProjectDetail
      }),
      Route({
        name: 'projects.create', 
        path: '/projects/create', 
        handler: ProjectCreate
      }),

      // employees
      Route({
        name: 'employees', 
        path: '/employees', 
        handler: Employees
      }),
      Route({
        name: 'employees.detail', 
        path: '/employees/detail/:_id', 
        handler: EmployeeDetail
      }),
      Route({
        name: 'employees.create', 
        path: '/employees/create', 
        handler: EmployeeCreate
      }),

      // timesheets
      Route({
        name: 'timesheets', 
        path: '/users/:user_id/timesheets', 
        handler: Timesheets
      }),
      Route({
        name: 'timesheets.create', 
        path: '/users/:user_id/timesheets/create', 
        handler: TimesheetCreate
      }),
      Route({
        name: 'timesheets.detail', 
        path: '/users/:user_id/timesheets/detail/:_id', 
        handler: TimesheetDetail
      }),
      Route({
        name: 'timesheets.detail.edit', 
        path: '/users/:user_id/timesheets/detail/:_id/edit', 
        handler: TimesheetEdit
      }),
         
      // timeunits 
      Route({
        name: 'timesheets.detail.timeunits.create', 
        path: '/users/:user_id/timesheets/detail/:_id/timeunits/create',
        handler: TimeunitCreate
      }),
      Route({
        name: 'timesheets.detail.timeunits.edit',
        path: '/users/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id',
        handler: TimeunitEdit
      })
    )
  )
), document.getElementById('app'));
        