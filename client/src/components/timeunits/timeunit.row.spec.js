var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Timeunit Row Component: ', function () {

  var TimeunitRow,
    element,
    spies;

  var React, TestUtils, proxyquire, mock;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    spies = {

    };

    timeunit = {
      "dateWorked": "2013-11-25T00:00:00.000Z", 
      "hoursWorked": 8,
      "project": "Project1"
    };

    TimeunitRow = require('./timeunit.row');
    element = TestUtils.renderIntoDocument(<TimeunitRow timeunit={timeunit} />);
  });

  it('should instantiate the TimeunitRow', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', function () {
    describe('when the timeunit is deleted', function () {
      it('should display an error in the snackbar', function () {

      });
    });

    describe('when the timeunit is NOT deleted', function () {
      it('should set the timeunit on the stored state', function () {

      });

      it('should transition to the detail route', function () {

      });
    });
  });

  describe('clicking the remove button', function () {
    it('should set the timeunit to deleted', function () {

    });

    it('should fire a remove timeunit action', function () {

    });

    it('should fade the row', function () {

    });

    it('should change the button to a restore button', function () {

    });
  });

  describe('clicking the restore button', function () {
    it('should set the timeunit to restored', function () {

    });

    it('should fire a restore timeunit action', function () {
      
    });

    it('should un-fade the row', function () {

    });

    it('should change the button back to a delete button', function () {
      
    });
  });
});
