angular.module('app.timesheets', [
  'app.timesheets.controllers'
  // TODO : add ui.router as a dependency
])
  
// TODO : create a config block to register the timeunit states
// 1. inject the $stateProvider
// 2. register the timeunit states with the state provider
// 3. app.timesheets with the Timeunit controller and index.html
// 4. app.timesheets.detail 
//   a. timesheet and timeunits are resolved 
// 5. app.timesheets.detail.edit
// 6. app.timesheets.detail.create

  .run(function ($api) {
    $api.add({
      resource: 'timesheets',
      url: '/users/:user_id/timesheets',
      params: {
        user_id: '@user_id'
      }
    });
  }); 
