describe('Timesheet actions: ', function () {

  var TimesheetActions,
    dispatcher,
    query,
    payload,
    timesheet = 'timesheet';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    TimesheetActions = require('./timesheet.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the TimesheetActions', function () {
    expect(TimesheetActions).to.be.defined;
  });

  describe('firing a list action', function () {
    beforeEach(function () {
      query = "query";
      TimesheetActions.list(query);

      payload = {query: query, actionType: TimesheetActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', function () {
    beforeEach(function () {
      id = "testId";
      TimesheetActions.get(id);

      payload = {timesheet: {_id: id}, actionType: TimesheetActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', function () {
    beforeEach(function () {
      TimesheetActions.create(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.CREATE};
    });

    it('should dispatch a view action with the timesheet and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', function () {
    beforeEach(function () {
      TimesheetActions.update(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.UPDATE};
    });

    it('should dispatch a view action with the timesheet and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', function () {
    beforeEach(function () {
      TimesheetActions.remove(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.DELETE};
    });

    it('should dispatch a view action with the timesheet and a type of DELETE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', function () {
    beforeEach(function () {
      TimesheetActions.restore(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.RESTORE};
    });

    it('should dispatch a view action with the timesheet and a type of RESTORE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
