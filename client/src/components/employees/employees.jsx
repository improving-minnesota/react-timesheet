var React = require('react/addons');
var Router = require('react-router');

var EmployeeTable = require('./employee.table');
var ChangeMixin = require('../../mixins/change.mixin');

var EmployeeActions = require('../../actions/employee.actions');
var EmployeeStore = require('../../stores/employee.store');
var Paginator = require('../common/paginator');

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

  onPageChange: function (page) {
    console.log(JSON.stringify(page));
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

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={20} onChange={this.onPageChange} />
          </div>
      </div>
      </div>
    );
  }
});

module.exports = Employees;
