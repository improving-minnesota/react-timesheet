var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Employee Form Component: ', function () {

  var EmployeeForm;

  beforeEach(function () {
    EmployeeForm = require('./employee.form');
  });

  it('should instantiate the EmployeeForm', function () {
    expect(EmployeeForm).to.be.defined;
  });
});
