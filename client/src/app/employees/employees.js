/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var FluxChildMixin = require('fluxxor').FluxChildMixin;
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var EmployeeTable = require('./employee.table');
var data = require('../../data/data');

var Employees = React.createClass({

  mixins: [
    FluxChildMixin(React),
    StoreWatchMixin('employees')
  ],

  getInitialState: function () {
    return {
      employees: []
    };
  },

  getStateFromFlux: function () {
    return {
      employees: this.getFlux().store('employees').employees
    };
  },

  requestEmployees: function requestEmployees () {
    this.getFlux().actions.employees.list();
  },

  createNew: function createNew () {
    Router.transitionTo('employees.create');
  },

  componentDidMount: function () {
    this.requestEmployees();
  },
  
  render: function () {
    return (
      <div className="tsz-employee-list">
        <div>
          <div className="row tsz-form-row">
            <div className="col-sm-2 pull-right">
              <button className="btn btn-primary btn-block" type="button" onClick={this.createNew}>
                <i className="icon-plus"/> New Employee
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <EmployeeTable employees={this.state.employees} />
            </div>
          </div>

          <div className="text-center">
            <div pagination
              total-items="pageConfig.totalItems" 
              ng-model="pageConfig.page" 
              items-per-page="pageConfig.limit" 
              boundary-links="true" 
              rotate="true" 
              ng-change="requestEmployees(page)">
            </div>
          </div>

        </div>

        <this.props.activeRouteHandler />
      </div>
    );
  }
}); 

module.exports = Employees;
