var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Timesheet Create Component: ', function () {

  var TimesheetCreate,
    element,
    spies,
    proxies;

  beforeEach(function () {
    proxies = {
      './timesheet.form': mock.mockComponent(),
      'react-router': {
        RouteHandler: mock.mockComponent(),
        Link: mock.mockComponent(),
        State: {
          getRoutes: sinon.stub.returns([{name: 'timesheets'}])
        }
      }
    };

    TimesheetCreate = proxyquire('./timesheet.create', proxies);
    element = TestUtils.renderIntoDocument(<TimesheetCreate />);
  });

  it('should instantiate the TimesheetCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving an timesheet', function () {
    it('should validate the entire timesheet', function () {

    });

    describe('when the timesheet passes validation', function () {
      it('should fire a create action', function () {

      });

      it('should transition back to the timesheet list', function () {
        
      });
    });
  });
});
