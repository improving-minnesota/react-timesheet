/** @jsx React.DOM */

var React = require('react');
var Route = require('react-nested-router').Route;

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

var Routes = React.createClass({

  render: function () {
    return (
      <Route handler={App}>

        <Route name="projects"        path="/projects" handler={Projects} />
        <Route name="projects.detail" path="/projects/detail/:_id" handler={ProjectDetail} />
        <Route name="projects.create" path="/projects/create" handler={ProjectCreate} />

        <Route name="employees"        path="/employees" handler={Employees} />
        <Route name="employees.detail" path="/employees/detail/:_id" handler={EmployeeDetail} />
        <Route name="employees.create" path="/employees/create" handler={EmployeeCreate} />
        
      </Route>
    );
  }
});

React.renderComponent(
  <Routes />, 
  document.getElementById('app')
);

module.exports = Routes;

        