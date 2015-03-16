var React = require('react/addons');
var classes = require('react-classes');

var Input = React.createClass({

  propTypes: {
    name:         React.PropTypes.string.isRequired,
    label:        React.PropTypes.string.isRequired,
    onChange:     React.PropTypes.func.isRequired,
    placeholder:  React.PropTypes.string,
    value:        React.PropTypes.string,
    error:        React.PropTypes.string
  },

  mixins: [classes],

  render: function () {
    var wrapperClasses = this.getClass('inline field', {
      'error': !!this.props.error
    });

    var containerClasses = this.getClass('field', {
      'error': !!this.props.error
    });

    return (
      <div className={wrapperClasses}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className={containerClasses}>
          <input type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = Input;
