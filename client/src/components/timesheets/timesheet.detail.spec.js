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

    // spies.transitionTo = sinon.stub(element, 'transitionTo');
    // spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    // spies.transitionTo.restore();
    // spies.validateAll.restore();
  });

  it('should instantiate the TimesheetDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - test me
});
