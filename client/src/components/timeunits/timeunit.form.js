/** @jsx React.DOM */

var React = require('React');

var FieldWrap = require('../common/field.wrap');

var TimeunitForm = React.createClass({

  render : function () {

    return (

      <div className="tsz-timeunit-form">
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" name="timeunitForm">

              <FieldWrap inputId="timeunit-project" label="Project" formField={
                <select ui-select2="projectSelect"
                  name="timeunit-project"
                  value={this.props.timeunit.project}
                  ref="project"
                  placeholder="Select Project..." required>

                </select>
              }/>

              <FieldWrap inputId="timeunit-dateWorked" label="Date" formField={
                <div>
                  <input type="text" className="form-control"
                    datepicker-popup="MM/dd/yyyy"
                    value={this.props.timeunit.dateWorked}
                    ref="dateWorked"
                    show-weeks="false"
                    show-button-bar="false"
                    min="timesheet.beginDate"
                    max="timesheet.endDate"
                    required
                    close-text="Close" />
                  <span className="input-group-btn">
                    <button className="btn btn-default">
                      <i className="fa fa-fw fa-calendar"/>
                    </button>
                  </span>
                </div>
              }/>

              <FieldWrap inpuId="timeunit-hoursWorked" label="Hours" formField={
                <input type="number" className="form-control"
                  name="timeunit-hoursWorked"
                  placeholder="Hours Worked"
                  value={this.props.timeunit.hoursWorked}
                  ref="hoursWorked"
                  required />
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block"
                    onClick={this.props.save}
                    ng-disabled="timeunitForm.$invalid">Save</button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" onClick={this.props.cancel}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TimeunitForm;
