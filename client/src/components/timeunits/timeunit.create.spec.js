var _ = require('lodash');
var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');

describe('Timeunit Create Component: ', function () {

  var TimeunitCreate,
    element,
    proxies,
    spies = {};

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      '../../actions/timeunit.actions': {
        create: sinon.stub()
      },
      './timeunit.form': mockComponent('TimeunitForm'),
      'react-router': {
        State: {
          getParams: sinon.stub().returns({user_id: 'userId', _id: 'abc123'})
        }
      }
    };

    TimeunitCreate = proxyquire('./timeunit.create', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    spies.validateAll.restore();
    spies.transitionTo.restore();
  });

  it('should instantiate the TimeunitCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving a timeunit', function () {
    beforeEach(function () {
      element.saveTimeunit({preventDefault: _.noop});
    });

    it('should validate the entire timeunit', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the timeunit passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire a create action', function () {
        expect(proxies['../../actions/timeunit.actions'].create).to.have.been.called;
      });

      it('should transition back to the timesheet detail for the timeunit', function () {
        expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail', {user_id: 'userId', _id: 'abc123'});
      });
    });
  });
});
