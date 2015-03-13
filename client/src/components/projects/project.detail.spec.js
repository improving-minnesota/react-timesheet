var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Project Detail Component: ', function () {

  var ProjectDetail,
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
          getParams: function () {return {_id: '123456'}}
        }
      }
    };

    ProjectDetail = proxyquire('./project.detail', proxies);
    element = TestUtils.renderIntoDocument(<ProjectDetail />);
  });

  it('should instantiate the ProjectDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when getting the project', function () {
    describe('when the project exists on the store state', function () {
      it('should set the project on the component state', function () {

      });
    });

    describe('when the project does NOT exist in the stored state', function () {
      it('should fire a get project action', function () {

      });
    });
  });

  describe('saving an project', function () {
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
