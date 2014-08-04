/** @jsx React.DOM */

var React = require('React');

var TimesheetForm = React.createClass({
  
  render : function () {
    return (
      <div className="tsz-timesheet-form" ng-cloak>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" novalidate name="timesheetForm">

              <div className="form-group">
                <div tsz-field-wrap input-id="timesheet-name" label="Name">
                  <input type="text" className="form-control" 
                    name="timesheet-name" placeholder="Timesheet Name"
                    ng-model="timesheet.name" 
                    ng-minlength="1" ng-maxlength="40" required>
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="timesheet-description" label="Description">
                  <input type="text" className="form-control" 
                    name="timesheet-description" placeholder="Timesheet Description"
                    ng-model="timesheet.description" 
                    ng-minlength="1" ng-maxlength="255" required>
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="timesheet-beginDate" label="Begin Date">
                  <div className="input-group">
                    <input type="text" className="form-control" 
                      datepicker-popup="MM/dd/yyyy"
                      ng-model="timesheet.beginDate"  
                      show-weeks="false"
                      show-button-bar="false"
                      ng-required="true" 
                      close-text="Close" />
                    <span className="input-group-btn">
                      <button className="btn btn-default">
                        <i className="fa fa-fw fa-calendar"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div tsz-field-wrap input-id="timesheet-endDate" label="End Date">
                  <div className="input-group">
                    <input type="text" className="form-control" 
                      datepicker-popup="MM/dd/yyyy"
                      ng-model="timesheet.endDate"  
                      show-weeks="false"
                      show-button-bar="false"
                      min="timesheet.beginDate"
                      ng-required="true" 
                      close-text="Close" />
                    <span className="input-group-btn">
                      <button className="btn btn-default">
                        <i className="fa fa-fw fa-calendar"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" 
                    ng-click="save()"
                    ng-disabled="timesheetForm.$invalid">{{saveText}}</button>
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

module.exports = TimesheetForm;
