var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Login Component: ', function () {

  var Login,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './auth.error': mock.mockComponent()
    };

    Login = proxyquire('./login', proxies);
    element = TestUtils.renderIntoDocument(<Login />);
  });

  it('should instantiate the Login', function () {
    expect(TestUtils.isCompositComponent(element)).to.be.true;
  });
});
