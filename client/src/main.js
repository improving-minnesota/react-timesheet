/** @jsx React.DOM */

var React = require('react');
var Routes = require('react-router').Routes;
var Route = require('react-router').Route;
var Fluxxor = require('fluxxor');

// Initialize the rest api
require('./data/resources')();

// Initialize the routes
React.renderComponent((
  Routes({},
    Route({handler: require('./app/app')}, 

      // projects
      Route({
        name: 'projects', 
        path: '/projects', 
        handler: require('./app/projects/projects')
      }),
      Route({
        name: 'projects.detail', 
        path: '/projects/detail/:_id', 
        handler: require('./app/projects/project.detail')
      }),
      Route({
        name: 'projects.create', 
        path: '/projects/create', 
        handler: require('./app/projects/project.create')
      }),

      // employees
      Route({
        name: 'employees', 
        path: '/employees', 
        handler: require('./app/employees/employees')
      }),
      Route({
        name: 'employees.detail', 
        path: '/employees/detail/:_id', 
        handler: require('./app/employees/employee.detail')
      }),
      Route({
        name: 'employees.create', 
        path: '/employees/create', 
        handler: require('./app/employees/employee.create')
      }),

      // timesheets
      Route({
        name: 'timesheets', 
        path: '/users/:user_id/timesheets', 
        handler: require('./app/timesheets/timesheets')
      }),
      Route({
        name: 'timesheets.create', 
        path: '/users/:user_id/timesheets/create', 
        handler: require('./app/timesheets/timesheet.detail')
      }),
      Route({
        name: 'timesheets.detail', 
        path: '/users/:user_id/timesheets/detail/:_id', 
        handler: require('./app/timesheets/timesheet.create')
      }),
      Route({
        name: 'timesheets.detail.edit', 
        path: '/users/:user_id/timesheets/detail/:_id/edit', 
        handler: require('./app/timesheets/timesheet.edit')
      }),
         
      // timeunits 
      Route({
        name: 'timesheets.detail.timeunits.create', 
        path: '/users/:user_id/timesheets/detail/:_id/timeunits/create',
        handler: require('./app/timesheets/timeunits/timeunit.create')
      }),
      Route({
        name: 'timesheets.detail.timeunits.edit',
        path: '/users/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id',
        handler: require('./app/timesheets/timeunits/timeunit.edit')
      })
    )
  )
), document.getElementById('app'));
        