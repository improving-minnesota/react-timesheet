var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Notifications Store: ', function () {

  var NotificationsStore;

  beforeEach(function () {
    NotificationsStore = require('./notifications.store');
  });

  it('should instantiate the NotificationsStore', function () {
    expect(NotificationsStore).to.be.defined;
  });
});
