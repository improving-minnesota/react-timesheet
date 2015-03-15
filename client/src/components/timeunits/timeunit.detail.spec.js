var _ = require('lodash');
var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');

describe('Timeunit Detail Component: ', function () {

  var TimeunitDetail,
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
      './timeunit.form': mockComponent('TimeunitForm'),
      '../../actions/timeunit.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams: sinon.stub().returns({_id: 'abc123', timeunit_id: 'tuId', user_id: 'userId'})
        }
      }
    };

    TimeunitDetail = proxyquire('./timeunit.detail', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the TimeunitDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the timeunit', function () {
    describe('and the timeunit exists on the store state', function () {
      beforeEach(function () {
        element.store.state.timeunit = {_id: 'abc123'};
        element.get();
      });

      it('should set the timeunit on the component state', function () {
        expect(element.state.timeunit._id).to.equal('abc123');
      });
    });

    describe('and the timeunit does NOT exist in the stored state', function () {
      beforeEach(function () {
        element.get('abc123', 'tuId');
      });

      it('should fire a get timeunit action', function () {
        expect(proxies['../../actions/timeunit.actions'].get).to.have.been.called;
      });
    });
  });

  describe('saving an timeunit', function () {
    beforeEach(function () {
      element.saveTimeunit({preventDefault: _.noop});
    });

    it('should validate the entire timeunit', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the timeunit passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire an update action', function () {
        expect(proxies['../../actions/timeunit.actions'].update).to.have.been.called;
      });

      it('should transition back to the timeunit list', function () { 
        expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail', { _id: "abc123", user_id: "userId" });
      });
    });
  });
});
