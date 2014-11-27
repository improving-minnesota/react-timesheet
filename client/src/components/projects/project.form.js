/** @jsx React.DOM */
var React = require('React');
var PropTypes = React.PropTypes;

var FieldWrap = require('../common/field.wrap');

var ProjectForm = React.createClass({

  render : function () {
    return (
      <div className="tsz-project-form" ng-cloak>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" novalidate name="projectForm">

              <FieldWrap inputId="project-name" label="Name" formField={
                <input type="text" className="form-control"
                  name="name" placeholder="Project Name"
                  ref='name' value={this.props.project.name}
                  minlength={1} maxlength={40} required
                  onChange={this.props.validate} />
              }/>

              <FieldWrap inputId="project-description" label="Description" formField={
                <input type="text" className="form-control"
                  name="description" placeholder="Project Description"
                  ref="description" value={this.props.project.description}
                  minlength={1} maxlength={255} required
                  onChange={this.props.validate} />
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

module.exports = ProjectForm;
