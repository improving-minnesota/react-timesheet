/** @jsx React.DOM */

var React = require('React');

var EmployeeForm = React.createClass({
  
  render : function () {
    return (
      <div className="tsz-employee-form">
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" novalidate name="employeeForm">

              <div className="form-group">
                <div tsz-field-wrap input-id="employee-username" label="Username">
                  <input type="text" className="form-control" 
                    name="employee-username" placeholder="Employee Username"
                    ng-model="employee.username" 
                    ng-minlength="1" ng-maxlength="40" required />
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="employee-email" label="Email">
                  <input type="text" className="form-control" 
                    name="employee-email" placeholder="Employee Email"
                    ng-model="employee.email" 
                    ng-minlength="1" ng-maxlength="255" required />
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="employee-firstName" label="First Name">
                  <input type="text" className="form-control" 
                    name="employee-firstName" placeholder="First Name"
                    ng-model="employee.firstName" 
                    ng-minlength="1" ng-maxlength="255" required />
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="employee-lastName" label="Last Name">
                  <input type="text" className="form-control" 
                    name="employee-lastName" placeholder="Last Name"
                    ng-model="employee.lastName" 
                    ng-minlength="1" ng-maxlength="255" required />
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="employee-admin" label="Admin">
                   <button type="button" className="btn btn-primary" 
                      ng-model="employee.admin" 
                      btn-checkbox 
                      btn-checkbox-true="true" 
                      btn-checkbox-false="false">{this.state.employee.admin}</button>
                </div>
              </div>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" 
                    ng-click="save()"
                    ng-disabled="employeeForm.$invalid">{this.state.saveText}</button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" ng-click="cancel()">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EmployeeForm;