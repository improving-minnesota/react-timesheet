/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet;
var PropTypes = React.PropTypes;

var Input = React.createClass({

  render: function () {
    var classNames = cx({
      'form-control': true
    });

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
