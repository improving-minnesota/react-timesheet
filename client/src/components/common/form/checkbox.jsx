var React = require('react/addons');

var Input = React.createClass({

  propTypes: {
    name:         React.PropTypes.string.isRequired,
    label:        React.PropTypes.string.isRequired,
    value:        React.PropTypes.bool,
    onChange:     React.PropTypes.func.isRequired,
    onClick:      React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div className="inline field" onClick={this.props.onClick}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="ui toggle checkbox">
          <input type="checkbox"
            name={this.props.name}
            checked={this.props.value}
            onChange={this.props.onChange} />

          <label>{this.props.value ? 'Yes' : 'No'}</label>
        </div>
      </div>
    );
  }
});

module.exports = Input;
