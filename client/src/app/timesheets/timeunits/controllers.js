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
    function ($scope, $state, $stateParams, timeunit) {
      $scope.timeunit = timeunit;
      
      $scope.save = function save () {
        $scope.timeunit.$update()
          .then(function (updated) {
            $scope.timeunit = updated;
            console.log('success !');
          })
          .catch(function (x) {
            console.log('error : ' + x);
            $state.reload();
          });
      };
    }
  )

  .controller('TimeunitCreateCtrl', 
    function ($scope, $state, $stateParams, $control, dateFilter) {
      $scope.timeunit = {
        user_id: $stateParams.user_id,
        timesheet_id: $stateParams._id,
        dateWorked: $scope.timesheet.beginDate
      };

      $scope.save = function save () {

        $control.create('timeunits', $scope.timeunit)
          .then(function (created) {
            $state.go('app.timesheets.detail', $stateParams, {reload: true});
            console.log('success !');
          })
          .catch(function (x) {
            console.log('error : ' + x);
          });
      };

    }
  );
    