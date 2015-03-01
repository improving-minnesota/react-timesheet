var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Notifications Actions Component: ', function () {
  var NotificationsActions;

  beforeEach(function () {
    NotificationsActions = require('./notifications.actions');
  });

  it('should instantiate the NotificationsActions', function () {
    expect(NotificationsActions).to.be.defined;
  });
});
