/** @jsx React.DOM */

var React = require('react/addons');
var PropTypes = React.PropTypes;

var FieldWrap = React.createClass({

  propTypes: {
    inputId: PropTypes.string,
    label: PropTypes.string,
    formField: PropTypes.module
  },
  
  render: function () {

    var labelCol = this.props.labelCol || '2';
    var labelClasses = "control-label col-sm-" + labelCol;

    var fieldCol = this.props.fieldCol || '4';
    var fieldClasses = "col-sm-" + fieldCol;

    return (
      <div className="form-group">
        <div className="tsz-field-wrapper">
          <label htmlFor={this.props.inputId} className={labelClasses}>{this.props.label}</label>
          <div className={fieldClasses}>
            {this.props.formField}
          </div>
        </div>
      </div>
    );
  }
}); 

module.exports = FieldWrap;
