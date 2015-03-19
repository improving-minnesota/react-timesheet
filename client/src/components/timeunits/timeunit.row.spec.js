describe('Timeunit Row Component: ', function () {

  var TimeunitRow,
    TimeunitActions,
    TimeunitStore,
    timeunit,
    timesheet,
    element,
    spies = {},
    button;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    TimeunitStore = require('../../stores/timeunit.store');
    TimeunitRow = require('./timeunit.row');
    TimeunitActions = require('../../actions/timeunit.actions');
  });

  it('should instantiate the TimeunitRow', function () {
    element = TestUtils.renderIntoDocument(
      <TimeunitRow timesheet={{_id: 1}}
        timeunit={{_id: 1}}
        store={TimeunitStore} />
    );
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', function () {
    describe('when the timeunit is deleted', function () {
      beforeEach(function () {
        timeunit = {
          _id: 'timeunitId',
          deleted: true
        };

        timesheet = {user_id: 'userId', _id: 'timesheetId'};

        element = TestUtils.renderIntoDocument(
          <TimeunitRow timeunit={timeunit}
            timesheet={timesheet}
            store={TimeunitStore} />
        );
        element.showDetail();
      });
    });

    describe('when the timeunit is NOT deleted', function () {
      beforeEach(function () {
        timeunit = {
          _id: 'timeunitId',
          name: 'timeunitOne',
          deleted: false
        };

        timesheet = {_id: 'timesheetId', user_id: 'userId'};

        element = TestUtils.renderIntoDocument(
          <TimeunitRow timesheet={timesheet}
            timeunit={timeunit}
            store={TimeunitStore} />
        );
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(function () {
        spies.transitionTo.restore();
      });

      it('should set the timeunit on the stored state', function () {
        expect(element.props.store.getState().timeunit.name).to.equal('timeunitOne');
      });

      it('should transition to the detail route', function () {
        expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail.timeunits.detail',
          { _id: "timesheetId", timeunit_id: "timeunitId", user_id: "userId" });
      });
    });
  });

  describe('clicking the remove button', function () {
    beforeEach(function () {
      timeunit = {
        _id: 'timeunitId',
        deleted: false
      };

      timesheet = {user_id: 'userId', _id: 'timesheetId'};

      spies.remove = sinon.stub(TimeunitActions, 'remove');

      element = TestUtils.renderIntoDocument(
        <TimeunitRow timeunit={timeunit}
          timesheet={timesheet}
          store={TimeunitStore} />
      );
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.remove.restore();
    });

    it('should set the timeunit to deleted', function () {
      expect(element.props.timeunit.deleted).to.be.true;
    });

    it('should fire a remove timeunit action', function () {
      expect(spies.remove).to.have.been.calledWith(timesheet, timeunit);
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      timeunit = {
        _id: 'timeunitId',
        deleted: true
      };

      timesheet = {user_id: 'userId', _id: 'timesheetId'};

      spies.restore = sinon.stub(TimeunitActions, 'restore');

      element = TestUtils.renderIntoDocument(
        <TimeunitRow timeunit={timeunit}
          timesheet={timesheet}
          store={TimeunitStore} />
      );
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.restore.restore();
    });

    it('should set the timeunit to restored', function () {
      expect(element.props.timeunit.deleted).to.be.false;
    });

    it('should fire a restore timeunit action', function () {
      expect(spies.restore).to.have.been.calledWith(timesheet, timeunit);
    });
  });
});
