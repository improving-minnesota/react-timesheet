var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Timeunit Edit Component: ', function () {

  var TimeunitEdit,
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
      './timeunit.form': mockComponent(),
      'react-router': {
        RouteHandler: mockComponent(),
        Link: mockComponent(),
        State: {
          getParams: function () {return {_id: '123456'}}
        }
      }
    };

    TimeunitEdit = proxyquire('./timeunit.edit', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitEdit />);
  });

  it('should instantiate the TimeunitEdit', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when getting the timeunit', function () {
    describe('when the timeunit exists on the store state', function () {
      it('should set the timeunit on the component state', function () {

      });
    });

    describe('when the timeunit does NOT exist in the stored state', function () {
      it('should fire a get timeunit action', function () {

      });
    });
  });

  describe('saving an timeunit', function () {
    it('should validate the entire timeunit', function () {

    });

    describe('when the timeunit passes validation', function () {
      it('should fire a create action', function () {

      });

      it('should transition back to the timeunit list', function () {

      });
    });
  });
});
