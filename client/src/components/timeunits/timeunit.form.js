/** @jsx React.DOM */

var React = require('React');

var FieldWrap = require('../common/field.wrap');

var TimeunitForm = React.createClass({

  render : function () {

    return (

      <div class="tsz-timeunit-form" ng-cloak>
        <div class="row">
          <div class="col-xs-12">
            <form class="form-horizontal" novalidate name="timeunitForm">

              <FieldWrap inputId="timeunit-project" label="Project" formField={
                <select ui-select2="projectSelect"
                  name="timeunit-project"
                  value={this.props.timeunit.project}
                  ref="project"
                  data-placeholder="Select Project..." required>

                </select>
              }/>

              <FieldWrap inputId="timeunit-dateWorked" label="Date" formField={
                <div>
                  <input type="text" class="form-control"
                    datepicker-popup="MM/dd/yyyy"
                    value={this.props.timeunit.dateWorked}
                    ref="dateWorked"
                    show-weeks="false"
                    show-button-bar="false"
                    min="timesheet.beginDate"
                    max="timesheet.endDate"
                    ng-required="true"
                    close-text="Close" />
                  <span class="input-group-btn">
                    <button class="btn btn-default">
                      <i class="fa fa-fw fa-calendar"/>
                    </button>
                  </span>
                </div>
              }/>

              <FieldWrap inpuId="timeunit-hoursWorked" label="Hours" formField={
                <input type="number" class="form-control"
                  name="timeunit-hoursWorked"
                  placeholder="Hours Worked"
                  value={this.props.timeunit.hoursWorked}
                  ref="hoursWorked"
                  required />
              }/>

              <div class="row">
                <hr/>
              </div>

              <div class="row">
                <div class="col-sm-2 col-sm-offset-8">
                  <button class="btn btn-primary btn-block"
                    onClick={this.props.save}
                    ng-disabled="timeunitForm.$invalid">Save</button>
                </div>
                <div class="col-sm-2">
                  <button class="btn btn-danger btn-block" onClick={this.props.cancel}>Cancel</button>
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
