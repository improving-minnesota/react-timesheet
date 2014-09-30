/** @jsx React.DOM */

var React = require('React');

var FieldWrap = require('../../form/field.wrap');

var TimesheetForm = React.createClass({
  
  render : function () {
    return (
      <div className="tsz-timesheet-form" ng-cloak>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" name="timesheetForm">

              <FieldWrap inputId="timesheet-name" label="Name" formField={
                <input type="text" className="form-control" 
                  name="timesheet-name" placeholder="Timesheet Name"
                  value={this.props.timesheet.name}
                  ng-minlength="1" ng-maxlength="40" required />
              }/>

              <FieldWrap inputId="timesheet-description" label="Description" formField={
                <input type="text" className="form-control" 
                  name="timesheet-description" placeholder="Timesheet Description"
                  value={this.props.timesheet.description}
                  ng-minlength="1" ng-maxlength="255" required />
              }/>

              <FieldWrap inputId="timesheet-beginDate" label="Begin Date" formField={
                <div>
                  <input type="text" className="form-control" 
                    datepicker-popup="MM/dd/yyyy"
                    value={this.props.timesheet.beginDate}
                    show-weeks="false"
                    show-button-bar="false"
                    required 
                    close-text="Close" />
                  <span className="input-group-btn">
                    <button className="btn btn-default">
                      <i className="fa fa-fw fa-calendar"/>
                    </button>
                  </span>
                </div>
              }/>

              <FieldWrap inputId="timesheet-endDate" label="End Date" formField={
                <div>
                  <input type="text" className="form-control" 
                    datepicker-popup="MM/dd/yyyy"
                    value={this.props.timesheet.endDate}
                    show-weeks="false"
                    show-button-bar="false"
                    min="timesheet.beginDate"
                    required 
                    close-text="Close" />
                  <span className="input-group-btn">
                    <button className="btn btn-default">
                      <i className="fa fa-fw fa-calendar"/>
                    </button>
                  </span>
                </div>
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" 
                    onClick={this.props.save}
                    ng-disabled="timesheetForm.$invalid">{this.state.saveText}</button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" 
                    onClick={this.props.cancel}>Cancel</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TimesheetForm;
