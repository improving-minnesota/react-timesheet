angular.module('app', [
  // TODO : add ui.router as a dependency
  'app.resources',
  'app.controllers',
  'app.employees',
  'app.projects',
  'app.timesheets',
  'app.timesheets.timeunits'
]);
 
// TODO : create a config block to register the app state
// 1. inject the $stateProvider
// 2. register the app state with the state provider
// 3. app state has multiple views: navbar and content
  