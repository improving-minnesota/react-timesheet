var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Project Create Component: ', function () {

  var ProjectCreate,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './project.form': mockComponent(),
      'react-router': {
        RouteHandler: mockComponent(),
        Link: mockComponent(),
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
