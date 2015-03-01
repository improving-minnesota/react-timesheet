var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Notifications : ', function () {

  var Notifications;

  beforeEach(function () {
    Notifications = require('./notifications');
  });

  it('should instantiate the Notifications', function () {
    expect(Notifications).to.be.defined;
  });
});
