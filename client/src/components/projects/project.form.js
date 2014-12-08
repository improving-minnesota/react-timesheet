/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var PropTypes = React.PropTypes;

var FieldWrap = require('../common/field.wrap');

var ProjectForm = React.createClass({

  mixins: [
    Router.Navigation
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.goBack();
  },

  render : function () {
    return (
      <div className="tsz-project-form" ng-cloak>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" novalidate name="projectForm" onSubmit={this.props.onSave}>

              <FieldWrap inputId="project-name" label="Name" error={this.props.errors.name} formField={
                <div>
                  <input type="text" className="form-control"
                    name="name" placeholder="Project Name"
                    ref='name' value={this.props.project.name}
                    onChange={this.props.validate} />
                  <div className="text-danger">{this.props.errors.name}</div>
                </div>
              }/>

              <FieldWrap inputId="project-description" label="Description" error={this.props.errors.description} formField={
                <div>
                  <input type="text" className="form-control"
                    name="description" placeholder="Project Description"
                    ref="description" value={this.props.project.description}
                    onChange={this.props.validate} />
                  <div className="text-danger">{this.props.errors.description}</div>
                </div>
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" type="submit">
                    {this.props.saveText}
                  </button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" type="button"
                    onClick={this.onCancel}>Cancel</button>
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
