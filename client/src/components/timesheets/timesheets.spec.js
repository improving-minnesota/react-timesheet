var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Timesheets Component: ', function () {

  var Timesheets,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './timesheet.table': mock.mockComponent(),
      '../common/navigation/paginator': mock.mockComponent()
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
