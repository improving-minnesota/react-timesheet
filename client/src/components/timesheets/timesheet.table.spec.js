var proxyquire = require('proxyquireify')(require);
var _ = require('lodash');
var mockComponent = require('../mock');

describe('Timesheet Table Component: ', function () {

  var TimesheetTable,
    timesheets,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './timesheet.row': mockComponent()
    };

    timesheets = [{}, {}];

    TimesheetTable = proxyquire('./timesheet.table', proxies);
    element = TestUtils.renderIntoDocument(<TimesheetTable timesheets={timesheets}/>);
  });

  it('should instantiate the TimesheetTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
