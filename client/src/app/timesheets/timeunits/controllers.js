angular.module('app.timesheets.timeunits.controllers', [])

  .controller('TimeunitCtrl', 
    function ($scope, $state, $stateParams, projects) {
      $scope.projects = projects; 

      $scope.cancel = function cancel () {
        $state.go('app.timesheets.detail', $stateParams, {reload: true});
      };
    }
  )

  .controller('TimeunitEditCtrl', 
    function ($scope, $state, $stateParams, timeunit) { // TODO : inject the notifications service
      $scope.timeunit = timeunit;
      
      $scope.save = function save () {
        $scope.timeunit.$update()
          .then(function (updated) {
            $scope.timeunit = updated;
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            // TODO : send an error notification using the notifications service
            $state.reload();
          });
      };
    }
  )

  .controller('TimeunitCreateCtrl', 
    function ($scope, $state, $stateParams, $control, dateFilter) { // TODO : inject the notifications service
      $scope.timeunit = {
        user_id: $stateParams.user_id,
        timesheet_id: $stateParams._id,
        dateWorked: $scope.timesheet.beginDate
      };

      $scope.save = function save () {

        $control.create('timeunits', $scope.timeunit)
          .then(function (created) {
            $state.go('app.timesheets.detail', $stateParams, {reload: true});
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            // TODO : send an error notification using the notifications service
          });
      };

    }
  );
    