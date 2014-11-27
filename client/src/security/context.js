module.exports = {
  user : {},
  authenticated : false,

  reset : function () {
    securityContext.user = {};
    securityContext.authenticated = false;
    return securityContext;
  },

  setAuthentication : function (context) {
    securityContext.authenticated = context.authenticated;
    securityContext.user = context.user;
  }
};
