var React = require('react/addons');
var classes = require('react-classes');
var PropTypes = React.PropTypes;

var Input = React.createClass({

  mixins: [classes],

  propTypes: {

  },

  render: function () {

    var containerClasses = this.getClass('field', {
      'error': !!this.props.error
    });

    return (
      <div className={containerClasses}>
        <input type="text"
          name={this.props.name} placeholder={this.props.placeholder}
          ref={this.props.name} value={this.props.value}
          onChange={this.props.onChange} />
        <div className="input">{this.props.error}</div>
      </div>
    );
  }
});

module.exports = Input;
