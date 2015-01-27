/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet;
var PropTypes = React.PropTypes;

var Input = React.createClass({

  render: function () {

    return (
      <div>
        <input type="text"
          name={this.props.name} placeholder={this.props.placeholder}
          ref={this.props.name} value={this.props.value}
          onChange={this.props.onChange} />
        <div className="red">{this.props.error}</div>
      </div>
    );
  }
});

module.exports = Input;
