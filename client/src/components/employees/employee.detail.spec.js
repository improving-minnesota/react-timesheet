var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Employee Detail Component: ', function () {

  var EmployeeDetail,
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
          getParams: function () {return {_id: '123456'}}
        }
      }
    };

    EmployeeDetail = proxyquire('./employee.detail', proxies);
    element = TestUtils.renderIntoDocument(<EmployeeDetail />);
  });

  it('should instantiate the EmployeeDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when getting the employee', function () {
    describe('when the employee exists on the store state', function () {
      it('should set the employee on the component state', function () {

      });
    });

    describe('when the employee does NOT exist in the stored state', function () {
      it('should fire a get employee action', function () {

      });
    });
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
