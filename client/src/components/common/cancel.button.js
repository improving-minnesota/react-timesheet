/** @jsx React.DOM */

var React = require('react/addons');

var CancelButton = React.createClass({

  render: function () {
    return (
      <div className="col-sm-2">
        <button className="btn btn-danger btn-block" type="button"
          onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
});

module.exports = CancelButton;
