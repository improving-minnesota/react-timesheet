var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Project Create Component: ', function () {

  var ProjectCreate,
    element,
    spies,
    proxies;

  beforeEach(function () {
        proxies = {
      './project.form': mock.mockComponent(),
      'react-router': {
        RouteHandler: mock.mockComponent(),
        Link: mock.mockComponent(),
        State: {
          getRoutes: sinon.stub.returns([{name: 'projects'}])
        }
      }
    };

    ProjectCreate = proxyquire('./project.create', proxies);
    element = TestUtils.renderIntoDocument(<ProjectCreate />);
  });

  it('should instantiate the ProjectCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving a project', function () {
    it('should validate the entire project', function () {

    });

    describe('when the project passes validation', function () {
      it('should fire a create action', function () {

      });

      it('should transition back to the project list', function () {
        
      });
    });
  });
});
