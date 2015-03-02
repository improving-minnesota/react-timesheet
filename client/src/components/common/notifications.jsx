var React = require('react/addons');

var NotificationsStore = require('../../stores/notifications.store');
var NotificationsAction = require('../../actions/notifications.actions');

var Notifications = React.createClass({

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  render: function () {

    // switch(this.state.type)

    return (
      <div className="notifications-container">
        <div className="notification green message">
          {this.state.success}
        </div>
        <div className="notifications blue message">
          {this.state.info}
        </div>
        <div className="notifications red message">
          {this.state.error}
        </div>
      </div>
    );
  }

});
