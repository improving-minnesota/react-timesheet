angular.module('app.projects', [
  'app.projects.controllers'
  // TODO : set ui.router as a dependency
])

// TODO : create a config block to register the project states
// 1. inject the $stateProvider
// 2. register the project states with the state provider
// 3. app.projects
// 4. app.projects.detail 
// 5. app.projects.create

.run(function ($api) {
   $api.add({
    resource: 'projects',
    url: '/projects'
  });
});
