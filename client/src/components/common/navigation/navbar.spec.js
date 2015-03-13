var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../../mock');

describe('Navbar Component: ', function () {

  var Navbar,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {
      getState: sinon.stub().returns({user: {_id: 'abc123'}}),
      addChangeListener: sinon.stub(),
      removeChangeListener: sinon.stub()
    };

    proxies = {
      '../../../stores/login.store': {
        getState: spies.getState,
        addChangeListener: spies.addChangeListener,
        removeChangeListener: spies.removeChangeListener
      },
      'react-router': {
        RouteHandler: mock.mockComponent(),
        Link: mock.mockComponent(),
        State: {
          getRoutes: sinon.stub.returns([{name: 'projects'}])
        }
      }
    };

    Navbar = proxyquire('./navbar', proxies);
    element = TestUtils.renderIntoDocument(<Navbar />);
  });

  it('should instantiate the Navbar', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when navigating between routes', function () {
    it('should set the appropriate active class', function () {

    });
  });

  describe('when a user logs in', function () {
    it('should set the user id in the url to the timesheets link', function () {

    });
  });

  describe('clicking the logout button', function () {
    it('should log the user out', function () {

    });
  });
});
