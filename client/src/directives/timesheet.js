angular.module('timesheet.directives', [])

  .directive('tszWeeklyProgressBar', function () {
    return {
      replace: true,
      scope: {
        hoursRequired: '=',
        hoursWorked: '=',
        report: '&'
      },
      template: '<div class="progress" ng-click="progressClicked()">
  <div class="progress-bar" style="width: {{percentComplete > 100 ? 100 : percentComplete}}%;">
    {{percentComplete | number:0}}%
  </div>
</div>',
      link: function (scope, element) {
        scope.$watch(function() {
          return (scope.hoursWorked / scope.hoursRequired) * 100;
        }, function(percentComplete) {
          scope.percentComplete = percentComplete;
        });

        scope.progressClicked = function progressClicked() {
          scope.report({percentComplete: Math.round(scope.percentComplete) + "%"});
        };
      }
    };
  });