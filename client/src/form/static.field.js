/** @jsx React.DOM */

var React = require('react/addons');

var StaticField = React.createClass({
  
  render: function () {
    var labelCol = this.props.labelCol || '2';
    var labelClasses = "control-label col-sm-" + labelCol;

    var inputCol = this.props.fieldCol || '4';
    var inputClasses = "col-sm-" + inputCol;
    

    return (
      <div className="tsz-static-field-container">
        <label className={labelClasses} for={this.props.inputId}>{this.props.label}</label>
        <div className={inputClasses}>
          <div id={this.props.inputId} className="tsz-form-static-text">{this.props.value}</div>
        </div>
      </div>
    );
  }
}); 

module.exports = StaticField;
