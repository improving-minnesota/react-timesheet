var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Timesheet Detail Component: ', function () {

  var TimesheetDetail,
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
      '../timeunits/timeunits': mockComponent(),
      'react-router': {
        RouteHandler: mockComponent(),
        Link: mockComponent(),
        State: {
          getParams: function () {return {_id: '123456'}}
        }
      }
    };

    TimesheetDetail = proxyquire('./timesheet.detail', proxies);
    element = TestUtils.renderIntoDocument(<TimesheetDetail />);
  });

  it('should instantiate the TimesheetDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when getting the timesheet', function () {
    describe('when the timesheet exists on the store state', function () {
      it('should set the timesheet on the component state', function () {

      });
    });

    describe('when the timesheet does NOT exist in the stored state', function () {
      it('should fire a get timesheet action', function () {

      });
    });
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
