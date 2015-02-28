var React = require('react/addons');

var SaveButton = React.createClass({

  render: function () {
    return (
      <div className="eight wide column">
        <button className="ui primary button" disabled={this.props.hasErrors} type="submit">
          {this.props.saveText}
        </button>
      </div>
    );
  }
});

module.exports = SaveButton;
