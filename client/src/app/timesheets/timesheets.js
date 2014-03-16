angular.module('app.timesheets', [
  'app.timesheets.controllers'
])

  .run(function ($api) {
    $api.add({
      resource: 'timesheets',
      url: '/users/:user_id/timesheets',
      params: {
        user_id: '@user_id'
      }
    });
  }); 
