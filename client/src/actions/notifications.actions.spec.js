jest.dontMock('./notifications.actions');

describe('Notifications Actions Component: ', function () {

  var NotificationsActions;

  beforeEach(function () {
    NotificationsActions = require('./notifications.actions');
  });

  it('should instantiate the NotificationsActions', function () {
    expect(NotificationsActions).toBeDefined();
  });
});
