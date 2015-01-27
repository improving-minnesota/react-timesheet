/** @jsx React.DOM */

var React = require('react/addons');

var CancelButton = React.createClass({

  render: function () {
    return (
      <div className="four wide column">
        <button className="ui primary button red" type="button"
          onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
});

module.exports = CancelButton;
