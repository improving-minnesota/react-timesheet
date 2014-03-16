angular.module('timesheet.directives', [])

  .directive('tszWeeklyProgressBar', function () {
    return {
      replace: true,
      scope: {
        hoursRequired: '=',
        hoursWorked: '=',
        report: '&'
      },
      templateUrl: 'assets/templates/directives/timesheet/progress-bar.html',
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