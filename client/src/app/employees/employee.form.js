/** @jsx React.DOM */
var React = require('React');
var PropTypes = React.PropTypes;

var FieldWrap = require('../../form/field.wrap');
var yesNo = require('../../filters/boolean');

var EmployeeForm = React.createClass({

  propTypes: {
    employee: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveText: PropTypes.string
  },

  toggleAdmin: function () {
    this.props.employee.admin = !this.props.employee.admin;
  },
  
  render : function () {
    return (
      <div className="tsz-employee-form">
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" name="employeeForm">
              
              <FieldWrap inputId="employee-username" label="Username" formField={
                <input className="form-control" 
                  name="employee-username" placeholder="Employee Username"
                  ref="username" value={this.props.employee.username} 
                  onChange={this.props.validate}/>
               }/>
            
              <FieldWrap inputId="employee-email" label="Email" formField={
                <input className="form-control" 
                  name="employee-email" placeholder="Employee Email"
                  ref="email" value={this.props.employee.email}/>
              }/>
            
              <FieldWrap inputId="employee-firstName" label="First Name" formField={
                <input className="form-control" 
                  name="employee-firstName" placeholder="First Name"
                  ref="firstName" value={this.props.employee.firstName} />
              }/>
            
              <FieldWrap inputId="employee-lastName" label="Last Name" formField={
                <input className="form-control" 
                  name="employee-lastName" placeholder="Last Name"
                  ref="lastName" value={this.props.employee.lastName} />
              }/>
   
              <FieldWrap inputId="employee-admin" label="Admin" formField={
                <button type="button" className="btn btn-primary" 
                  onClick={this.props.toggleAdmin}>
                    {yesNo(this.props.employee.admin)}
                </button>
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" 
                    onClick={this.props.onSave}
                    ng-disabled="employeeForm.$invalid">{this.props.saveText}</button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" onClick={this.props.onCancel}>Cancel</button>
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