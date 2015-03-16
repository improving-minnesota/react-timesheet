describe('Employee Row Component: ', function () {

  var EmployeeRow,
    EmployeeActions,
    EmployeeStore,
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
    EmployeeStore = require('../../stores/employee.store');
    EmployeeRow = require('./employee.row');
    EmployeeActions = require('../../actions/employee.actions');
  });

  it('should instantiate the EmployeeRow', function () {
    element = TestUtils.renderIntoDocument(<EmployeeRow employee={{_id: 1}} store={EmployeeStore} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the remove button', function () {
    beforeEach(function () {
      employee = {
        _id: 'abc123',
        username: 'pamPoovey',
        deleted: false
      };

      spies.remove = sinon.stub(EmployeeActions, 'remove');

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.remove.restore();
    });

    it('should set the employee to deleted', function () {
      expect(element.props.employee.deleted).to.be.true;
    });

    it('should fire a remove employee action', function () {
      expect(spies.remove).to.have.been.calledWith(employee);
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      employee = {
        _id: 'abc123',
        username: 'cyrilFiggus',
        deleted: true
      };

      spies.restore = sinon.stub(EmployeeActions, 'restore');

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.restore.restore();
    });

    it('should set the employee to restored', function () {
      expect(element.props.employee.deleted).to.be.false;
    });

    it('should fire a restore employee action', function () {
      expect(spies.restore).to.have.been.calledWith(employee);
    });
  });
});
