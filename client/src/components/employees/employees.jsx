var React = require('react/addons');
var Router = require('react-router');

var EmployeeTable = require('./employee.table');
var ChangeMixin = require('../../mixins/change.mixin');

var EmployeeActions = require('../../actions/employee.actions');
var EmployeeStore = require('../../stores/employee.store');

var Employees = React.createClass({

  mixins: [
    Router.Navigation,
    ChangeMixin
  ],

  store: EmployeeStore,

  requestEmployees: EmployeeActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  createNew: function createNew () {
    this.transitionTo('employees.create');
  },

  componentDidMount: function () {
    this.requestEmployees();
  },

  render: function () {
    return (
      <div>
        <div className="row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            <i className="icon-plus"/> New Employee
          </button>
        </div>

        <div className="row">
          <EmployeeTable employees={this.state.employees}/>
        </div>

        <div className="center aligned">
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
    );
  }
});

module.exports = Employees;
