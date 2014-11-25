/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var EmployeeTable = require('./employee.table');
var actions = require('../../actions/employee.actions');
var EmployeeStore = require('../../stores/employee.store');

var EmployeeMixin = require('../../mixins/employee.mixin');

var Employees = React.createClass({

  mixins: [
    EmployeeMixin
  ],

  store: EmployeeStore.initialize(),

  requestEmployees: actions.listEmployees,

  getInitialState: function () {
    return this.store.getState();
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
              <EmployeeTable employees={this.state.employees} store={this.store}/>
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
