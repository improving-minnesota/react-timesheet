/** @jsx React.DOM */

var React = require('react/addons');

var EmployeeTable = require('./employee.table');

var Employees = React.createClass({

  getInitialState: function () {
    return {
      employees: this.requestEmployees()
    };
  },

  requestEmployees: function requestEmployees () {
    // var query = {
    //   page: page || $scope.pageConfig.page,
    //   sort: {username: 1}
    // };

    // data.page('employees', query)
    //   .then(function (pageConfig) {
    //     $scope.pageConfig = pageConfig;
    //   });

    return [
      {
        "_id": "111",
        "username": "admin", 
        "email": "admin@mixtape.com", 
        "password": "password", 
        "admin": true, 
        "firstName": "Admin", 
        "lastName": "User"
      },
      {
        "_id": "222",
        "username": "user", 
        "email": "user@mixtape.com", 
        "password": "password", 
        "admin": false, 
        "firstName": "Normal", 
        "lastName": "User"
      }
    ];
  },

  createNew: function createNew () {
    Router.transitionTo('app.employees.create');
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

        {this.props.activeRoute}
      </div>
    );
  }
}); 

module.exports = Employees;
