var _ = require('lodash'),
  React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  fluxDispatcher = require('../flux/flux.dispatcher');

describe('Login actions: ', function () {

  var LoginActions,
    dispatcher,
    credentials = 'credentials';

  beforeEach(function () {
    LoginActions = require('./login.actions');
    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the LoginActions', function () {
    expect(LoginActions).to.be.defined;
  });

  describe('firing a currentUser action', function () {
    beforeEach(function () {
      LoginActions.currentUser();

      payload = {actionType: LoginActions.CURRENT_USER};
    });

    it('should dispatch a view action with a type of CURRENT_USER', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a login action', function () {
    beforeEach(function () {
      LoginActions.login(credentials);

      payload = {credentials: credentials, actionType: LoginActions.LOGIN};
    });

    it('should dispatch a view action with the credentials and a type of LOGIN', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a logout action', function () {
    beforeEach(function () {
      LoginActions.logout();

      payload = {actionType: LoginActions.LOGOUT};
    });

    it('should dispatch a view action with the employee and a type of LOGOUT', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
