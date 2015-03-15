describe('Timesheet Row Component: ', function () {

  var TimesheetRow,
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
    TimesheetRow = require('./timesheet.row');
  });

  it('should instantiate the TimesheetRow', function () {
    element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={{_id: 1}} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the remove button', function () {
    beforeEach(function () {
      timesheet = {
        _id: 'abc123',
        user_id: 'userId',
        deleted: false
      };

      element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    it('should set the timesheet to deleted', function () {
      expect(element.props.timesheet.deleted).to.be.true;
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      timesheet = {
        _id: 'abc123',
        user_id: 'userId',
        deleted: true
      };

      element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    it('should set the timesheet to restored', function () {
      expect(element.props.timesheet.deleted).to.be.false;
    });
  });
});
