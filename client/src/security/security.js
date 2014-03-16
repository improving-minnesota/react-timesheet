angular.module('app.security', [
  'app.security.controllers',
  'ui.router'
])
.config(function ($stateProvider) {

  $stateProvider
    // -------------  Login ----------------
    .state('login', {
      url: '/login?redirect',
      data: {
        section: 'Please Log In'
      },
      views : {
        'login' : {
          templateUrl: 'assets/templates/security/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
})

.run(function ($api) {
  
  $api.add({
    resource: 'login',
    url: '/login',
    params: {},
    methods: {
      'login' : {
        method: 'POST'
      },
      'current' : {
        method: 'GET'
      }
    },
    unnatural: true
  });

  $api.add({
    resource: 'logout',
    url: '/logout',
    params: {},
    methods: {
      'logout' : {
        method: 'POST'
      }
    },
    unnatural: true
  });
});