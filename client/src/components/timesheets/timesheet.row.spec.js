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
});
