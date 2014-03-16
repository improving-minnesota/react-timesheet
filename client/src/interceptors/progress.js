angular.module('progress.interceptors', [])
  .factory('nProgressInterceptor', function ($q, $injector) {
  
      return {

        // TODO : Start the progress bar and continue the promise on request
        // TODO : Stop the progress bar and reject the promise on requestError
        // TODO : Stop the progress bar and continue the promise on response
        // TODO : Stop the progress bar and reject the promise on responseError

      };
    }
  )

// We have to add the interceptor to the queue as a string because the interceptor 
// depends upon service instances that are not available in the config block.
.config(function ($httpProvider) {

  // TODO : Register the interceptor with the http provider
  
});