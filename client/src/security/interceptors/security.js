angular.module('security.interceptors', [
  'security.services'
])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', function ($q, $injector) {

    return {

      // TODO : Implement an interceptor to show the login page on unauthenticated user

    };
  }
)

// We have to add the interceptor to the queue as a string because the interceptor 
// depends upon service instances that are not available in the config block.
.config(function ($httpProvider) {
  // TODO : Register the interceptor with the http provider
});