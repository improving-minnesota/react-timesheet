var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');var _ = require('lodash');

describe('Auth Error Component: ', function () {

  var AuthError,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    AuthError = require('./auth.error');
    element = TestUtils.renderIntoDocument(<AuthError authError="none" />);
  });

  it('should instantiate the AuthError', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
