var _ = require('lodash');

describe('Employee Table Component: ', function () {

  var EmployeeTable,
    employees,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    employees = [{}, {}];

    EmployeeTable = require('./employee.table');
    element = TestUtils.renderIntoDocument(
      <EmployeeTable employees={employees} />
    );
  });

  it('should instantiate the EmployeeTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
