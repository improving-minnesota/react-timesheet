var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Timesheets Component: ', function () {

  var Timesheets,
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
      './timesheet.table': mockComponent(),
      '../common/navigation/paginator': mockComponent()
    };

    Timesheets = proxyquire('./timesheets', proxies);
    element = TestUtils.renderIntoDocument(<Timesheets />);
  });

  it('should instantiate the Timesheets', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new timesheet button', function () {
    it('should transition to the create timesheet route', function () {
      
    });
  });
});
