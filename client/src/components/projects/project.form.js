/** @jsx React.DOM */
var React = require('React');

var FieldWrap = require('..//common/field.wrap');

var ProjectForm = React.createClass({
  
  render : function () {
    return (
      <div className="tsz-project-form" ng-cloak>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" novalidate name="projectForm">

              <FieldWrap inputId="project-name" label="Name" formField={
                <input type="text" className="form-control" 
                  name="project-name" placeholder="Project Name"
                  ng-model="project.name" 
                  ng-minlength="1" ng-maxlength="40" required />
              }/>

              <FieldWrap inputId="project-description" label="Description" formField={
                <input type="text" className="form-control" 
                  name="project-description" placeholder="Project Description"
                  ng-model="project.description" 
                  ng-minlength="1" ng-maxlength="255" required />
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" 
                    onClick={this.save}
                    ng-disabled="projectForm.$invalid">{this.state.saveText}</button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" onClick={this.cancel}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProjectForm;
