var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Employee Mixin: ', function () {

  var Employee;

  beforeEach(function () {
    Employee = require('./employee.mixin');
  });

  it('should instantiate the Employee', function () {
    expect(Employee).to.be.defined;
  });
});
