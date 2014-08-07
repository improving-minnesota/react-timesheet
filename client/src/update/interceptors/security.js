angular.module('security.interceptors', [
  'security.services'
])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', function ($q, $injector) {

    return {

      responseError : function (response) {
        // We must use $injector to prevent circular dependency
        var queue = $injector.get('retryQueue');

        if (response.status == 401 && response.config.url !== '/login' ) {
          return queue.pushRetryFn('unauthorized-server', function retryRequest() {
            return $injector.get('$http')(response.config);
          });
        }
        else if (response.status == 403) {
          return queue.pushRetryFn('access-denied-server', function retryRequest() {
            return $injector.get('$http')(response.config); 
          });
        }

        return $q.reject(response);
      }
    };
  }
)

// We have to add the interceptor to the queue as a string because the interceptor 
// depends upon service instances that are not available in the config block.
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('securityInterceptor');
});