var _ = require('lodash');
var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');

describe('Timesheet Detail Component: ', function () {

  var TimesheetDetail,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './timesheet.form': mockComponent('TimesheetForm'),
      '../../actions/timesheet.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams: function () {return {_id: 'abc123'}}
        }
      }
    };

    TimesheetDetail = proxyquire('./timesheet.detail', proxies);
    element = TestUtils.renderIntoDocument(<TimesheetDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the TimesheetDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the timesheet', function () {
    describe('and the timesheet exists on the store state', function () {
      beforeEach(function () {
        element.store.state.timesheet = {_id: 'abc123'};
        element.get();
      });

      it('should set the timesheet on the component state', function () {
        expect(element.state.timesheet._id).to.equal('abc123');
      });
    });

    describe('and the timesheet does NOT exist in the stored state', function () {
      beforeEach(function () {
        element.get();
      });

      it('should fire a get timesheet action', function () {
        expect(proxies['../../actions/timesheet.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an timesheet', function () {
    beforeEach(function () {
      element.saveTimesheet({preventDefault: _.noop});
    });

    it('should validate the entire timesheet', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the timesheet passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire an update action', function () {
        expect(proxies['../../actions/timesheet.actions'].update).to.have.been.called;
      });

      it('should transition back to the timesheet list', function () { 
        expect(spies.transitionTo).to.have.been.calledWith('timesheets');
      });
    });
  });
});
