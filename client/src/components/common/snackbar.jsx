var React = require('react/addons');
var classes = require('react-classes');

var NotificationsStore = require('../../stores/notifications.store');

var Snackbar = React.createClass({

  store: NotificationsStore,

  mixins: [classes],

  propTypes: {
    message: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      message: '',
      messageType: ''
    };
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.notify);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.notify);
  },

  notify: function () {
    this.setState(this.store.getState());
  },

  hide: function () {
    this.setState({message: ''});
  },

  render: function () {

    var classes = this.getClass('ui inline nag top right', {
      'hide':     !this.state.message.length,
      'success':  this.state.messageType === 'success',
      'info':     this.state.messageType === 'info',
      'error':    this.state.messageType === 'error'
    });

    return (
      <div className={classes}>
        <span className="title">{this.state.message}</span>
        <i className="fa fa-close" onClick={this.hide} />
      </div>
    )
  }

});

module.exports = Snackbar;
