var _ = require('lodash');
var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../../mock');

describe('Navbar Component: ', function () {

  var Navbar,
    element,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      '../../../stores/login.store': {
        getState: sinon.stub().returns({user: {_id: 'abc123'}}),
        addChangeListener: sinon.stub(),
        removeChangeListener: sinon.stub()
      },
      '../../../actions/login.actions': {
        logout: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getRoutes: sinon.stub().returns([{name: 'projects'}])
        }
      },
      '@noCallThru': true
    };

    Navbar = proxyquire('./navbar', proxies);
    element = TestUtils.renderIntoDocument(<Navbar />);
  });

  it('should instantiate the Navbar', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when navigating between routes', function () {
    it('should set the appropriate active class', function () {
      var Links = TestUtils.scryRenderedComponentsWithType(element, proxies['react-router'].Link);
      var projectLink = TestUtils.findRenderedDOMComponentWithClass(element, 'active');
      expect(projectLink.getDOMNode().innerText).to.equal('Projects');
    });
  });
});
