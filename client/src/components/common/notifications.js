var React = require('react/addons');

var NotificationsStore = require('../../stores/notifications.store');
var NotificationsAction = require('../../actions/notifications.actions');
var ChangeMixin = require('../../mixins/change.mixin');

var Notifications = React.createClass({

  mixins: [
    ChangeMixin
  ],

  render: function () {

    switch(this.state.type)

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
