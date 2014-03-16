angular.module('app.projects.controllers', [])
    
  .controller('ProjectCtrl', 
    function ($control, $scope, $state, $stateParams) { 

      $scope.requestProjects = function requestProjects (page) {
        
        $control.list('projects')
          .then(function (projects) {
            $scope.projects = projects;
          });
      };

      $scope.showDetail = function showDetail (project) {
        if (project.deleted) {
          console.log('cannot view a deleted project');
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
            console.log('success !');
          })
          .catch(function (x) {
            project.deleted = false;
            console.log('error : ' + x);
          });
      };

      $scope.restore = function restore (project) { 

        $control.restore('projects', project) 
          .then(function (restored) {
            console.log('success !');
          })
          .catch(function (x) {
            project.deleted = true;
            console.log('error : ' + x);
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.projects', {}, {reload: true});
      };

      $scope.requestProjects(1);
    }
  )

  .controller('ProjectDetailCtrl', 
    function ($scope, $state, $stateParams, project) {
      $scope.saveText = $state.current.data.saveText;
      $scope.project = project;

      $scope.save = function save () {
        $scope.project.$update()
          .then(function (updated) {
            $scope.project = updated;
            console.log('success !');
          })
          .catch(function (x) {
            console.log('error : ' + x);
          });
      };
    }
  )

  .controller('ProjectCreateCtrl', 
    function ($scope, $state, $stateParams, $control) {
      $scope.saveText = $state.current.data.saveText;
      $scope.project = {};

      $scope.save = function save () {
        $control.create('projects', $scope.project) 
          .then(function (created) {
            $state.go('app.projects.detail', {_id: created._id});
            console.log('success !');
          })
          .catch(function (x) {
            console.log('error : ' + x);
          });
      };
    }
  );