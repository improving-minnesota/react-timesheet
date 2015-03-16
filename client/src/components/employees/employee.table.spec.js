var _ = require('lodash');

describe('Employee Table Component: ', function () {

  var EmployeeTable,
    EmployeeStore,
    employees,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    EmployeeStore = require('../../stores/employee.store');
  });

  beforeEach(function () {
    employees = [{}, {}];

    EmployeeTable = require('./employee.table');
    element = TestUtils.renderIntoDocument(
      <EmployeeTable employees={employees} store={EmployeeStore} />
    );
  });

  it('should instantiate the EmployeeTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
