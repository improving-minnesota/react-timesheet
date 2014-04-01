angular.module('app.projects.controllers', [])
    
  .controller('ProjectCtrl', 
    function (data, $scope) { 

      $scope.requestProjects = function requestProjects (page) {
        
        data.list('projects')
          .then(function (projects) {
            $scope.projects = projects;
          });
      };

      $scope.remove = function remove (project) {
        data.remove('projects', project)
          .then(function (removed) {
            console.log('success !');
          })
          .catch(function (x) {
            project.deleted = false;
            console.log('error : ' + x);
          });
      };

      $scope.restore = function restore (project) { 

        data.restore('projects', project) 
          .then(function (restored) {
            console.log('success !');
          })
          .catch(function (x) {
            project.deleted = true;
            console.log('error : ' + x);
          });
      };

      $scope.requestProjects(1);
    }
  );