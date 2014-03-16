angular.module('app.employees.controllers', [])
  
  .controller('EmployeeCtrl', 
    function ($control, $scope, $state, $stateParams) {

      $scope.requestEmployees = function requestEmployees (page) {

        $control.list('employees')
          .then(function (employees) {
            $scope.employees = employees;
          });
      };

      $scope.showDetail = function showDetail (employee) {
        if (employee.deleted) {
          console.log('cannot view a deleted employee');
          return;
        }
        $state.go('app.employees.detail', employee);
      };  

      $scope.createNew = function createNew () {
        $state.go('app.employees.create', $stateParams);
      };

      $scope.remove = function remove (employee) {

        $control.remove('employees', employee) 
          .then(function () {
            console.log('success!');
          })
          .catch(function (x) {
            employee.deleted = false;
            console.log('error : ' + x);
          });
      };

      $scope.restore = function restore (employee) {
       
       $control.restore('employees', employee)
          .then(function (restored) {
            console.log('success!');
          })
          .catch(function (x) {
            employee.deleted = true;
            console.log('error : ' + x);
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.employees', {}, {reload: true});
      };

      $scope.requestEmployees(1);
    }
  )

  .controller('EmployeeDetailCtrl', 
    function ($scope, $state, $stateParams, employee) {
      $scope.saveText = $state.current.data.saveText;
      $scope.employee = employee;

      $scope.save = function save () {
        $scope.employee.$update()
          .then(function (updated) {
            $scope.timesheet = updated;
            console.log('success!');
          })
          .catch(function (x) {
            console.log('error : ' + x);
          });
      };
    }
  )

  .controller('EmployeeCreateCtrl', 
    function ($scope, $state, $stateParams, $control) {
      $scope.saveText = $state.current.data.saveText;
      $scope.employee = {admin: false};

      $scope.save = function save () {
        $control.create('employees', $scope.employee)
          .then(function (created) {
            console.log('success!');
            $state.go('app.employees.detail', {_id: created._id});
          })
          .catch(function (x) {
            console.log('error : ' + x);
          });
      };
    }
  );