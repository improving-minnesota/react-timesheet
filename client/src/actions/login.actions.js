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

  login: function (credentials) {
    dispatcher.handleViewAction({
      actionType: LoginActions.LOGIN,
      credentials: credentials
    });
  },

  logout: function () {
    dispatcher.handleViewAction({
      actionType: LoginActions.LOGOUT
    });
  }
};

module.exports = LoginActions;
