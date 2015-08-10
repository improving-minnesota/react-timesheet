var Popover   = require('./popover');
var DateUtil  = require('./date.util');
var Calendar  = require('./calendar');
var DateInput = require('./date_input');
var React = require('react/addons');
var classNames = require('classnames');

var DatePicker = React.createClass({

  propTypes: {
    name:       React.PropTypes.string.isRequired,
    label:      React.PropTypes.string.isRequired,
    selected:   React.PropTypes.object,
    error:      React.PropTypes.string,
    onChange:   React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      focus: false
    };
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    this.setState({
      focus: false
    });
  },

  handleBlur: function(event) {
    // if we click the button, let it do its job
    if (event.relatedTarget === event.target.nextSibling.children[0]) return;

    this.setState({
      focus: !! this._shouldBeFocussed
    });

    if (!! this._shouldBeFocussed) {
      // Firefox doesn't support immediately focussing inside of blur
      setTimeout(function() {
        this.setState({
          focus: true
        });
      }.bind(this), 0);
    }

    // Reset the value of this._shouldBeFocussed to it's default
    this._shouldBeFocussed = false;
  },

  handleCalendarMouseDown: function() {
    this._shouldBeFocussed = true;
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    this.props.onChange(date.moment());
  },

  onInputClick: function() {
    this.setState({
      focus: true
    });
  },

  onButtonClick: function () {
    this.setState({
      focus: !this.state.focus
    });

    // focus the input on button click so that blur will close the popover
    this.refs[this.props.name].refs[this.props.name].getDOMNode().focus();
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            selected={this.props.selected}
            onSelect={this.handleSelect}
            onMouseDown={this.handleCalendarMouseDown} />
        </Popover>
      );
    }
  },

  render: function() {
    var wrapperClasses = classNames('inline field', {
      'error': !!this.props.error
    });

    return (
       <div className={wrapperClasses}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <DateInput
          ref={this.props.name}
          name={this.props.name}
          date={this.props.selected}
          focus={this.state.focus}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          handleClick={this.onInputClick}
          handleButtonClick={this.onButtonClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          error={this.props.error} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
