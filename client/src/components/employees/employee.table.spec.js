var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Employee Table Component: ', function () {

  var EmployeeTable;

  beforeEach(function () {
    EmployeeTable = require('./employee.table');
  });

  it('should instantiate the EmployeeTable', function () {
    expect(EmployeeTable).to.be.defined;
  });
});
