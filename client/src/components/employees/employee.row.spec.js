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

  describe('clicking the row', function () {
    describe('when the employee is deleted', function () {
      beforeEach(function () {
        employee = {
          _id: 'abc123',
          deleted: true
        };

        spies.error = sinon.stub(SnackbarActions, 'error');

        element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
        element.showDetail();
      });

      afterEach(function () {
        spies.error.restore();
      });

      it('should display an error in the snackbar', function () {
        expect(spies.error).to.have.been.calledWith('You cannot edit a deleted employee.');
      });
    });

    describe('when the employee is NOT deleted', function () {
      beforeEach(function () {
        employee = {
          _id: 'abc123',
          username: 'sterlingArcher',
          deleted: false
        };

        element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(function () {
        spies.transitionTo.restore();
      });

      it('should set the employee on the stored state', function () {
        expect(element.props.store.getState().employee.username).to.equal('sterlingArcher');
      });

      it('should transition to the detail route', function () {
        expect(spies.transitionTo).to.have.been.calledWith('employees.detail', {_id: 'abc123'});
      });
    });
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
