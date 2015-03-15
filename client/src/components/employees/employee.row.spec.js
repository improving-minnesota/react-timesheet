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

  describe('clicking the remove button', function () {
    beforeEach(function () {
      employee = {
        _id: 'abc123',
        username: 'pamPoovey',
        deleted: false
      };

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    it('should set the employee to deleted', function () {
      expect(element.props.employee.deleted).to.be.true;
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      employee = {
        _id: 'abc123',
        username: 'cyrilFiggus',
        deleted: true
      };

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    it('should set the employee to restored', function () {
      expect(element.props.employee.deleted).to.be.false;
    });
  });
});
