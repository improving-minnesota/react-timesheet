var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Employee Row Component: ', function () {

  var EmployeeRow;

  beforeEach(function () {
    EmployeeRow = require('./employee.row');
  });

  it('should instantiate the EmployeeRow', function () {
    expect(EmployeeRow).to.be.defined;
  });
});
