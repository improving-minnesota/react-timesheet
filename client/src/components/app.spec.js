var proxyquire = require('proxyquireify')(require);
var mockComponent  = require('./mock');

describe('App: ', function () {

  var App,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './common/navigation/navbar': mockComponent('Navbar'),
      './common/section': mockComponent('SectionHeader'),
      'react-router': {
        RouteHandler: mockComponent('RouteHandler')
      },
      '../stores/login.store': {
        requireAuthenticatedUser: sinon.stub()
      }
    };

    App = proxyquire('./app', proxies);
    element = TestUtils.renderIntoDocument(<App />);
  });

  it('should instantiate the App', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - test the will transition to static method
});
