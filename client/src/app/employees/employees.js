/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-nested-router');

var EmployeeTable = require('./employee.table');
var data = require('../../data/data');

var Employees = React.createClass({

  getInitialState: function () {
    return {
      employees: []
    };
  },

  requestEmployees: function requestEmployees () {
    var self = this;
    // var query = {
    //   page: this.state.page || 1,
    //   sort: {username: 1}
    // };

    // data.page('employees', query)
    data.list('employees')
      .then(function (employees) {
        self.setState({employees: employees});
      });
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

        <this.props.activeRoute />
      </div>
    );
  }
}); 

module.exports = Employees;
