angular.module('app.projects.controllers', [])
    
  .controller('ProjectCtrl', 
    function ($control, $scope, $state, $stateParams) { // TODO : inject the notifications service

      $scope.requestProjects = function requestProjects (page) {
        
        $control.list('projects')
          .then(function (projects) {
            $scope.projects = projects;
          });
      };

      $scope.showDetail = function showDetail (project) {
        if (project.deleted) {
          // TODO : Send a notification to the user that they cannot view a deleted project
          return;
        }
        $state.go('app.projects.detail', project);
      };

      $scope.createNew = function createNew () {
        $state.go('app.projects.create', $stateParams);
      };

      $scope.remove = function remove (project) {
        $control.remove('projects', project)
          .then(function (removed) {
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            project.deleted = false;
            // TODO : send an error notification using the notifications service
          });
      };

      $scope.restore = function restore (project) { 

        $control.restore('projects', project) 
          .then(function (restored) {
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            project.deleted = true;
            // TODO : send an error notification using the notifications service
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.projects', {}, {reload: true});
      };

      $scope.requestProjects(1);
    }
  )

  .controller('ProjectDetailCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, project) {
      $scope.saveText = $state.current.data.saveText;
      $scope.project = project;

      $scope.save = function save () {
        $scope.project.$update()
          .then(function (updated) {
            $scope.project = updated;
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            // TODO : send an error notification using the notifications service
          });
      };
    }
  )

  .controller('ProjectCreateCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, $control) {
      $scope.saveText = $state.current.data.saveText;
      $scope.project = {};

      $scope.save = function save () {
        $control.create('projects', $scope.project) 
          .then(function (created) {
            $state.go('app.projects.detail', {_id: created._id});
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            // TODO : send an error notification using the notifications service
          });
      };
    }
  );