var React = require('react/addons');
var classes = require('react-classes');

var SnackbarStore = require('../../stores/snackbar.store');
var SnackbarActions = require('../../actions/snackbar.actions');

var Snackbar = React.createClass({

  store: SnackbarStore,

  mixins: [classes],

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
    SnackbarActions.hide();
  },

  render: function () {

    var classes = this.getClass('ui inline snackbar top right', {
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
