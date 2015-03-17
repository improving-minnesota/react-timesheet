describe('Timesheet Row Component: ', function () {

  var TimesheetRow,
    TimesheetActions,
    TimesheetStore,
    timesheet,
    element,
    spies = {},
    button;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    TimesheetStore = require('../../stores/timesheet.store');
    TimesheetRow = require('./timesheet.row');
    TimesheetActions = require('../../actions/timesheet.actions');
  });

  it('should instantiate the TimesheetRow', function () {
    element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={{_id: 1}} store={TimesheetStore} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the remove button', function () {
    beforeEach(function () {
      timesheet = {
        _id: 'abc123',
        user_id: 'userId',
        deleted: false
      };

      spies.remove = sinon.stub(TimesheetActions, 'remove');

      element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} store={TimesheetStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.remove.restore();
    });

    it('should set the timesheet to deleted', function () {
      expect(element.props.timesheet.deleted).to.be.true;
    });

    it('should fire a remove timesheet action', function () {
      expect(spies.remove).to.have.been.calledWith(timesheet);
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      timesheet = {
        _id: 'abc123',
        user_id: 'userId',
        deleted: true
      };

      spies.restore = sinon.stub(TimesheetActions, 'restore');

      element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} store={TimesheetStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.restore.restore();
    });

    it('should set the timesheet to restored', function () {
      expect(element.props.timesheet.deleted).to.be.false;
    });

    it('should fire a restore timesheet action', function () {
      expect(spies.restore).to.have.been.calledWith(timesheet);
    });
  });
});
