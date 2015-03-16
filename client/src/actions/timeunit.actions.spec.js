describe('Timeunit actions: ', function () {

  var TimeunitActions,
    dispatcher,
    query,
    payload,
    timesheet = 'timesheet',
    timeunit = 'timeunit';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    TimeunitActions = require('./timeunit.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the TimeunitActions', function () {
    expect(TimeunitActions).to.be.defined;
  });

  describe('firing a list action', function () {
    beforeEach(function () {
      query = "query";
      TimeunitActions.list(timesheet, query);

      payload = {query: query, timesheet: timesheet, actionType: TimeunitActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', function () {
    beforeEach(function () {
      id = "testId";
      TimeunitActions.get(timesheet, id);

      payload = {timeunit: {_id: id}, timesheet: timesheet, actionType: TimeunitActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', function () {
    beforeEach(function () {
      TimeunitActions.create(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.CREATE};
    });

    it('should dispatch a view action with the timeunit and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', function () {
    beforeEach(function () {
      TimeunitActions.update(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.UPDATE};
    });

    it('should dispatch a view action with the timeunit and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', function () {
    beforeEach(function () {
      TimeunitActions.remove(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.DELETE};
    });

    it('should dispatch a view action with the timeunit and a type of DELETE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', function () {
    beforeEach(function () {
      TimeunitActions.restore(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.RESTORE};
    });

    it('should dispatch a view action with the timeunit and a type of RESTORE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
