var moment = require('moment');
var React = require('react/addons');

var Day = React.createClass({

  propTypes: {
    selected: React.PropTypes.object,
    onClick: React.PropTypes.func.isRequired,
    day: React.PropTypes.object
  },

  render: function() {
    classes = React.addons.classSet({
      'datepicker-calendar-day': true,
      'selected': this.props.day.sameDay(this.props.selected),
      'this-month': this.props.day.sameMonth(this.props.date),
      'today': this.props.day.sameDay(moment())
    });

    return (
      <div className={classes} onClick={this.props.onClick}>
        {this.props.day.day()}
      </div>
    );
  }
});

module.exports = Day;
