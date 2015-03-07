var React = require('react/addons');
var cx = React.addons.classSet;

var FieldWrap = React.createClass({

  propTypes: {
    inputId:    React.PropTypes.string,
    label:      React.PropTypes.string,
    formField:  React.PropTypes.element
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
