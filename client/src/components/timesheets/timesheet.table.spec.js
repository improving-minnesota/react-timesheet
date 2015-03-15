var _ = require('lodash');

describe('Timesheet Table Component: ', function () {

  var TimesheetTable,
    timesheets,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    timesheets = [{}, {}];

    TimesheetTable = require('./timesheet.table');
    element = TestUtils.renderIntoDocument(
      <TimesheetTable timesheets={timesheets} />
    );
  });

  it('should instantiate the TimesheetTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
