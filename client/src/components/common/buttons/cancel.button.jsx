var React = require('react/addons');

var CancelButton = React.createClass({

  propTypes: {
    onCancel: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div className="eight wide column">
        <button className="ui secondary button red" type="button"
          onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
});

module.exports = CancelButton;
