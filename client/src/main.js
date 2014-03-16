angular.module('main', [
  'templates-main',
  'templates-lib',
  'app'
])

.run(function ($log) {
  $log.info("Application running.");
});
