angular.module('main', [
  'templates-main',
  'templates-lib',
  'app',
  'ui.select2',
  'ui.bootstrap.datepicker',
  'ui.bootstrap.pagination',
  'ui.bootstrap.buttons',
  'ngSanitize',
  'ngAnimate'
])

.run(function ($log) {
  $log.info("Application running.");
});
