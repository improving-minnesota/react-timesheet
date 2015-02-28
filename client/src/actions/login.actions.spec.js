var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Login actions: ', function () {

  var LoginActions;

  beforeEach(function () {
    LoginActions = require('./login.actions');
  });

  it('should instantiate the LoginActions', function () {
    expect(LoginActions).to.be.defined;
  });
});
