var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Employee Create Component: ', function () {

  var EmployeeCreate,
    element,
    spies,
    proxies;

  beforeEach(function () {
    proxies = {
      './employee.form': mock.mockComponent(),
      'react-router': {
        RouteHandler: mock.mockComponent(),
        Link: mock.mockComponent(),
        State: {
          getRoutes: sinon.stub.returns([{name: 'projects'}])
        }
      }
    };

    EmployeeCreate = proxyquire('./employee.create', proxies);
    element = TestUtils.renderIntoDocument(<EmployeeCreate />);
  });

  it('should instantiate the EmployeeCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving an employee', function () {
    it('should validate the entire employee', function () {

    });

    describe('when the employee passes validation', function () {
      it('should fire a create action', function () {

      });

      it('should transition back to the employee list', function () {
        
      });
    });
  });
});
