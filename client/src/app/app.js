angular.module('app', [
  'app.resources',
  'app.controllers',
  'app.employees',
  'app.projects',
  'app.timesheets',
  'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider.
    when('/projects', {
      templateUrl: 'assets/templates/app/projects/index.html',
      controller: 'ProjectCtrl'
    })
    .when('/employees', {
      templateUrl: 'assets/templates/app/employees/index.html',
      controller: 'EmployeeCtrl'
    })
    .when('/timesheets', {
      templateUrl: 'assets/templates/app/timesheets/index.html',
      controller: 'TimesheetCtrl'
    })
    .otherwise({
      redirectTo: '/projects'
    });
});
  