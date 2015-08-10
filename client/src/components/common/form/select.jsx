var React = require('react/addons');
var classNames = require('classnames');
var ReactSelect = require('react-select');

var Select = React.createClass({

  propTypes: {
    name:         React.PropTypes.string.isRequired,
    label:        React.PropTypes.string.isRequired,
    onChange:     React.PropTypes.func.isRequired,
    placeholder:  React.PropTypes.string,
    value:        React.PropTypes.string,
    error:        React.PropTypes.string,
    options:      React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render: function () {
    var wrapperClasses = classNames('inline field', {
      'error': !!this.props.error
    });

    var containerClasses = classNames('field', {
      'error': !!this.props.error
    });

    return (
      <div className={wrapperClasses}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className={containerClasses}>


          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = Select;
