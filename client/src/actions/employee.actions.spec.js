var _ = require('lodash'),
  React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  fluxDispatcher = require('../flux/flux.dispatcher');

describe('Employee actions: ', function () {

  var EmployeeActions,
    dispatcher,
    query,
    payload,
    employee;

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    EmployeeActions = require('./employee.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the EmployeeActions', function () {
    expect(EmployeeActions).to.be.defined;
  });

  describe('firing a list action', function () {
    beforeEach(function () {
      query = "query";
      EmployeeActions.list(query);

      payload = {query: query, actionType: EmployeeActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', function () {
    beforeEach(function () {
      id = "testId";
      EmployeeActions.get(id);

      payload = {employee: {_id: id}, actionType: EmployeeActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', function () {
    beforeEach(function () {
      EmployeeActions.create(employee);

      payload = {employee: employee, actionType: EmployeeActions.CREATE};
    });

    it('should dispatch a view action with the employee and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', function () {
    beforeEach(function () {
      EmployeeActions.update(employee);

      payload = {employee: employee, actionType: EmployeeActions.UPDATE};
    });

    it('should dispatch a view action with the employee and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', function () {
    beforeEach(function () {
      EmployeeActions.remove(employee);

      payload = {employee: employee, actionType: EmployeeActions.DELETE};
    });

    it('should dispatch a view action with the employee and a type of DELETE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', function () {
    beforeEach(function () {
      EmployeeActions.restore(employee);

      payload = {employee: employee, actionType: EmployeeActions.RESTORE};
    });

    it('should dispatch a view action with the employee and a type of RESTORE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
