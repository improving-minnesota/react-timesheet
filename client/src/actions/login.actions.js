var dispatcher = require('../flux/flux.dispatcher');

var LoginActions = {

  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CURRENT_USER: 'CURRENT_USER',

  currentUser: function () {
    dispatcher.handleViewAction({
      actionType: LoginActions.CURRENT_USER
    });
  },

  login: function () {
    dispatcher.handleViewAction({
      actionType: LoginActions.LOGIN
    });
  },

  logout: function () {
    dispatcher.handleViewAction({
      actionType: LoginActions.LOGOUT
    });
  }
};

module.exports = LoginActions;
