var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Employee Table Component: ', function () {

  var EmployeeTable,
    employees,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './employee.row': mock.mockComponent()
    };

    employees = [{}, {}];

    EmployeeTable = proxyquire('./employee.table', proxies);
    element = TestUtils.renderIntoDocument(<EmployeeTable employees={employees}/>);
  });

  it('should instantiate the EmployeeTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
