angular.module('app.employees', [
  'app.employees.controllers'
])

.run(function ($api) {
  $api.add({
    resource: 'employees',
    url: '/users'
  });
});
