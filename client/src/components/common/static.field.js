/** @jsx React.DOM */

var React = require('react/addons');

var StaticField = React.createClass({

  render: function () {

    return (
      <div className="tsz-static-field-container inline field">
        <label for={this.props.inputId}>{this.props.label}</label>
        <div id={this.props.inputId} className="tsz-form-static-text">{this.props.value}</div>
      </div>
    );
  }
});

module.exports = StaticField;
