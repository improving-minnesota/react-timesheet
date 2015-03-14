describe('Snackbar actions: ', function () {

  var SnackbarActions,
    dispatcher,
    query,
    payload,
    message = 'message';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    SnackbarActions = require('./snackbar.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the SnackbarActions', function () {
    expect(SnackbarActions).to.be.defined;
  });

  describe('firing a error action', function () {
    beforeEach(function () {
      SnackbarActions.error(message);

      payload = {message: message, actionType: SnackbarActions.ERROR};
    });

    it('should dispatch a view action with the message and a type of ERROR', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a success action', function () {
    beforeEach(function () {
      SnackbarActions.success(message);

      payload = {message: message, actionType: SnackbarActions.SUCCESS};
    });

    it('should dispatch a view action with the id and a type of SUCCESS', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a info action', function () {
    beforeEach(function () {
      SnackbarActions.info(message);

      payload = {message: message, actionType: SnackbarActions.INFO};
    });

    it('should dispatch a view action with the message and a type of INFO', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a new action', function () {
    beforeEach(function () {
      SnackbarActions.new();

      payload = {actionType: SnackbarActions.NEW};
    });

    it('should dispatch a view action with the message and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a hide action', function () {
    beforeEach(function () {
      SnackbarActions.hide();

      payload = {actionType: SnackbarActions.HIDE};
    });

    it('should dispatch a view action with the message and a type of HIDE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
