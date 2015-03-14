var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Timesheet Create Component: ', function () {

  var TimesheetCreate,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './timesheet.form': mockComponent(),
      'react-router': {
        RouteHandler: mockComponent(),
        Link: mockComponent(),
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
