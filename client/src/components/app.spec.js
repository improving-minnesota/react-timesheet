var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('./mock');

describe('App: ', function () {

  var App,
    element,
    spies = {},
    proxies;

  beforeEach(function () {
    spies.authenticatedUser = sinon.stub();

    proxies = {
      './common/navigation/navbar': mock.mockComponent(),
      './common/section': mock.mockComponent(),
      '../stores/login.store': {
        requireAuthenticatedUser: spies.authenticatedUser
      },
      'react-router': {
        RouteHandler: mock.mockComponent()
      }
    };

    App = proxyquire('./app', proxies);
    element = TestUtils.renderIntoDocument(<App />);
  });

  it('should instantiate the App', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('during the will transition to lifecyle', function () {
    it('should require an authenticated user from the login store', function () {
      App.willTransitionTo('transitionArg', 'paramsArg');
      expect(spies.authenticatedUser).to.have.been.calledWith('transitionArg');
    });
  });
});
