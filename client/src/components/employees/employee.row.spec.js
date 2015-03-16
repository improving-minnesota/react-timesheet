describe('Employee Row Component: ', function () {

  var EmployeeRow,
    employee,
    element,
    spies = {},
    button;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    EmployeeRow = require('./employee.row');
  });

  it('should instantiate the EmployeeRow', function () {
    element = TestUtils.renderIntoDocument(<EmployeeRow employee={{_id: 1}} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
