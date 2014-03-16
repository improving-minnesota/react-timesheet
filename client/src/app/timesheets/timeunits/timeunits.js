angular.module('app.timesheets.timeunits', [
    'app.timesheets.timeunits.controllers',
    // TODO : add ui.router as a dependency
  ])
  
// TODO : create a config block to register the timeunit states
// 1. inject the $stateProvider
// 2. register the timeunit states with the state provider
// 3. app.timesheets.detail.timeunits with the Timeunit controller and index.html
// 4. app.timesheets.detail.timeunits.create 
// 5. app.timesheets.detail.timeunits.edit

  .run(function ($api) {

    $api.add({
      resource: 'timeunits',
      url: '/users/:user_id/timesheets/:timesheet_id/timeunits',
      params: {
        user_id: '@user_id',
        timesheet_id: '@timesheet_id'
      }
    });
  });
