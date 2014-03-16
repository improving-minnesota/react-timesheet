angular.module('app', [
  'ui.router',
  'app.resources',
  'app.controllers',
  'app.employees',
  'app.projects',
  'app.timesheets',
  'app.timesheets.timeunits',
  'app.security',
  'authorization.services'
])

  .config(function ($stateProvider, authorizationProvider) {

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        data: {
          title: 'The Timesheet App'
        },
        views : {
          'navbar' : {
            controller: 'NavCtrl',
            templateUrl: 'assets/templates/app/navbar.html'
          },
          'content' : {
            controller: 'AppCtrl',
            templateUrl: 'assets/templates/app/index.html'
          }
        }, 
        resolve: {
          authenticatedUser: authorizationProvider.requireAuthenticatedUser
        }
      });
  });
  