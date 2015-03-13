var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Timesheet Table Component: ', function () {

  var TimesheetTable,
    timesheets,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './timesheet.row': mock.mockComponent()
    };

    timesheets = [{}, {}];

    TimesheetTable = proxyquire('./timesheet.table', proxies);
    element = TestUtils.renderIntoDocument(<TimesheetTable timesheets={timesheets}/>);
  });

  it('should instantiate the TimesheetTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
