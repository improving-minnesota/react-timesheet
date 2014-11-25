/** @jsx React.DOM */
var React = require('React');
var PropTypes = React.PropTypes;

var FieldWrap = require('../../form/field.wrap');
var yesNo = require('../../filters/boolean');

var EmployeeForm = React.createClass({

  render : function () {
    return (
      <div className="tsz-form">
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" name="employeeForm">

              <FieldWrap inputId="username" label="Username" formField={
                <input className="form-control"
                  name="username" placeholder="Employee Username"
                  ref="username" value={this.props.employee.username}
                  onChange={this.props.handleChange}/>
               }/>

              <FieldWrap inputId="email" label="Email" formField={
                <input className="form-control"
                  name="email" placeholder="Employee Email"
                  ref="email" value={this.props.employee.email}
                  onChange={this.props.handleChange}/>
              }/>

              <FieldWrap inputId="firstName" label="First Name" formField={
                <input className="form-control"
                  name="firstName" placeholder="First Name"
                  ref="firstName" value={this.props.employee.firstName}
                  onChange={this.props.handleChange} />
              }/>

              <FieldWrap inputId="lastName" label="Last Name" formField={
                <input className="form-control"
                  name="lastName" placeholder="Last Name"
                  ref="lastName" value={this.props.employee.lastName}
                  onChange={this.props.handleChange} />
              }/>

              <FieldWrap inputId="admin" label="Admin" formField={
                <button type="button" className="btn btn-primary"
                  onClick={this.props.toggleAdmin}>
                    {yesNo(this.props.employee.admin)}
                </button>
              }/>

            </form>

            <div className="row">
              <hr/>
            </div>

            <div className="row">
              <div className="col-sm-2 col-sm-offset-8">
                <button className="btn btn-primary btn-block"
                  onClick={this.props.onSave}>{this.props.saveText}</button>
              </div>
              <div className="col-sm-2">
                <button className="btn btn-danger btn-block"
                  onClick={this.props.onCancel}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EmployeeForm;
