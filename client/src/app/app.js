angular.module('app', [
  'app.resources',
  'app.controllers',
  'app.employees',
  'app.projects',
  'app.timesheets',
  'ngRoute'
])

.config(function ($routeProvider) {

  // TODO : Register the application routes with $routeProvider
  // 1. /projects : projects/index.html template and ProjectCtrl
  // 2. /employees : employees/index.html template and EmployeeCtrl
  // 3. /timesheets : timesheets/index.html template and TimesheetCtrl
  // 4. default other routes to /projects
  // 5. the base url for all templates is 'assets/templates/app'
});
  