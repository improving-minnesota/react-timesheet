/** @jsx React.DOM */

var React = require('React');
var PropTypes = React.PropTypes;

var Input = React.createClass({

  render: function () {
    return (
      <input type="text" className="form-control"
        name={this.props.name} placeholder={this.props.placeholder}
        ref={this.props.name} value={this.props.value}
        onChange={this.validate} />
    );
  }
});
