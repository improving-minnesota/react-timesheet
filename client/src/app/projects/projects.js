angular.module('app.projects', [
  'app.projects.controllers'
])

.run(function ($api) {
   $api.add({
    resource: 'projects',
    url: '/projects'
  });
});
