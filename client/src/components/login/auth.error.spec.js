var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Auth Error Component: ', function () {

  var AuthError,
    element,
    spies,
    proxies;

  beforeEach(function () {
    AuthError = require('./auth.error');
    element = TestUtils.renderIntoDocument(<AuthError authError="none" />);
  });

  it('should instantiate the AuthError', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
