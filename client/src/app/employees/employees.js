angular.module('app.employees', [
  'app.employees.controllers'
  // TODO : set ui.router as a dependency
])

// TODO : create a config block to register the employee states
// 1. inject the $stateProvider
// 2. register the employee states with the state provider
// 3. app.employees with the Employee controller and index.html
// 4. app.employees.detail 
// 5. app.employees.create

.run(function ($api) {
  $api.add({
    resource: 'employees',
    url: '/users'
  });
});
