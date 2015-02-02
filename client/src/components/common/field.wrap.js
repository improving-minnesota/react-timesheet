/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet;
var PropTypes = React.PropTypes;

var FieldWrap = React.createClass({

  propTypes: {
    inputId: PropTypes.string,
    label: PropTypes.string,
    formField: PropTypes.component
  },

  render: function () {

    var wrapperClasses = cx({
      'inline': true,
      'field': true,
      'has-error': this.props.error,
      'has-success': !this.props.error
    });

    return (
      <div className={wrapperClasses}>
        <label htmlFor={this.props.inputId}>{this.props.label}</label>
        {this.props.formField}
      </div>
    );
  }
});

module.exports = FieldWrap;
