var _ = require('lodash');

describe('Timesheet Table Component: ', function () {

  var TimesheetTable,
    TimesheetStore,
    timesheets,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    TimesheetStore = require('../../stores/timesheet.store');
  });

  beforeEach(function () {
    timesheets = [{}, {}];

    TimesheetTable = require('./timesheet.table');
    element = TestUtils.renderIntoDocument(
      <TimesheetTable timesheets={timesheets} store={TimesheetStore} />
    );
  });

  it('should instantiate the TimesheetTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
