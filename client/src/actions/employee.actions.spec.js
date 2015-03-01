var React = require('react/addons'),
    TestUtils = React.addons.TestUtils;

describe('Employee actions: ', function () {

  var EmployeeActions;

  beforeEach(function () {
    EmployeeActions = require('./employee.actions');
  });

  it('should instantiate the EmployeeActions', function () {
    expect(EmployeeActions).to.be.defined;
  });
});
