var React = require('react/addons');

var Input = React.createClass({

  propTypes: {
    name:         React.PropTypes.string,
    value:        React.PropTypes.number,
    placeholder:  React.PropTypes.string,
    error:        React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div>
        <input type="number" className="form-control"
          name={this.props.name} placeholder={this.props.placeholder}
          ref={this.props.name} value={this.props.value}
          onChange={this.props.onChange} />
        <div className="text-danger">{this.props.error}</div>
      </div>
    );
  }
});

module.exports = Input;
