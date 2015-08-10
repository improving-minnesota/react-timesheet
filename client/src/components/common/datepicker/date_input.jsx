var moment = require('moment');
var DateUtil = require('./date.util');
var React = require('react/addons');
var classNames = require('classnames');

var DateInput = React.createClass({

  propTypes: {
    name:               React.PropTypes.string.isRequired,
    date:               React.PropTypes.object,
    focus:              React.PropTypes.bool,
    handleClick:        React.PropTypes.func,
    handleEnter:        React.PropTypes.func,
    handleButtonClick:  React.PropTypes.func,
    onBlur:             React.PropTypes.func,
    onFocus:            React.PropTypes.func,
    error:              React.PropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.date.format("YYYY-MM-DD")
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: newProps.date.format("YYYY-MM-DD")
    });
  },

  componentDidUpdate: function() {
    if (this.props.focus) {
      var el = this.refs[this.props.name].getDOMNode();

      if (typeof this.state.selectionStart == "number")
        el.selectionStart = this.state.selectionStart;

      if (typeof this.state.selectionEnd == "number")
        el.selectionEnd = this.state.selectionEnd;
    }
  },

  toggleFocus: function(focus) {
    if (focus) {
      this.refs[this.props.name].getDOMNode().focus();
    } else {
      this.refs[this.props.name].getDOMNode().blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, "YYYY-MM-DD", true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, "YYYY-MM-DD", true);

    return date.isValid();
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    case "ArrowUp":
    case "ArrowDown":
      event.preventDefault();
      this.handleArrowUpDown(event.key);
      break;
    }
  },

  handleArrowUpDown: function(key) {
    if (! this.isValueAValidDate())
      return;

    this.updateSelectionState();

    var el = this.refs[this.props.name].getDOMNode();
    var step = key === "ArrowUp" ? 1 : -1;

    var selectedDatePart = this.getSelectedDatePart(el.selectionStart, el.selectionEnd);
    var newDate = this.stepSelectedDatePart(selectedDatePart, step);

    this.props.setSelected(newDate);
  },

  stepSelectedDatePart: function(selectedDatePart, step) {
    var clonedDate = this.props.date.clone();

    return new DateUtil(clonedDate.add(selectedDatePart, step));
  },

  getSelectedDatePart: function(selectionStart, selectionEnd) {
    if (selectionStart >= 0 && selectionEnd <= 4) {
      return "year";
    } else if (selectionStart >= 5 && selectionEnd <= 7) {
      return "month";
    } else if (selectionStart >= 8 && selectionEnd <= 10) {
      return "day";
    }
  },

  updateSelectionState: function() {
    var el = this.refs[this.props.name].getDOMNode();

    this.setState({
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    });
  },

  handleClick: function(event) {
    this.updateSelectionState();
    this.props.handleClick();
  },

  handleButtonClick: function (event) {
    event.preventDefault();
    event.stopPropagation();

    this.updateSelectionState();
    this.props.handleButtonClick();
  },

  render: function() {
    var containerClasses = classNames('ui inline field', {
      'error': !!this.props.error
    });

    var errorMessageClasses = classNames('input', {
      'error': !!this.props.error
    });

    return (
      <div className="datepicker-input">
        <div className={containerClasses}>
          <input
            ref={this.props.name}
            name={this.props.name}
            type="text"
            value={this.state.value}
            onBlur={this.props.onBlur}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onFocus={this.props.onFocus}
            onChange={this.handleChange} />
          <span>
            <button className="ui secondary button" onClick={this.handleButtonClick}>
              <i className="fa fa-fw fa-calendar"></i>
            </button>
          </span>
        </div>
        <div className={errorMessageClasses}>{this.props.error}</div>
      </div>
    );
  }
});

module.exports = DateInput;
