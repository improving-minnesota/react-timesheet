angular.module('security.services', [])

  .factory('securityContext', function () {
    
    var securityContext = {      
      user : {},
      authenticated : false,

      reset : function () {
        securityContext.user = {};
        securityContext.authenticated = false;
        return securityContext;
      },

      setAuthentication : function (context) {
        securityContext.authenticated = context.authenticated;
        securityContext.user = context.user;
      }
    };

    return securityContext;
  })

   // This is a generic retry queue for security failures.  Each item is expected to expose two functions: retry and cancel.
  .factory('retryQueue', function ($q, $log) {
    var queue = [];
    var service = {
      // The security service puts its own handler in here!
      onItemAddedCallbacks: [],
      
      hasMore: function () {
        return queue.length > 0;
      },

      push: function (retryItem) {
        queue.push(retryItem);
        // Call all the onItemAdded callbacks
        angular.forEach(service.onItemAddedCallbacks, function (cb) {
          try {
            cb(retryItem);
          } catch(e) {
            $log.error('retryQueue.push(retryItem): callback threw an error' + e);
          }
        });
      },

      pushRetryFn: function (reason, retryFn) {
        // The reason parameter is optional
        if ( arguments.length === 1) {
          retryFn = reason;
          reason = undefined;
        }

        // The deferred object that will be resolved or rejected by calling retry or cancel
        var deferred = $q.defer();
        var retryItem = {
          reason: reason,
          retry: function () {
            // Wrap the result of the retryFn into a promise if it is not already
            $q.when(retryFn())
              .then(function (value) {
                // If it was successful then resolve our deferred
                deferred.resolve(value);
              }, function (value) {
                // Othewise reject it
                deferred.reject(value);
              });
          },
          cancel: function () {
            // Give up on retrying and reject our deferred
            deferred.reject();
          }
        };
        service.push(retryItem);
        return deferred.promise;
      },

      retryReason: function () {
        return service.hasMore() && queue[0].reason;
      },

      cancelAll: function () {
        while(service.hasMore()) {
          queue.shift().cancel();
        }
      },

      retryAll: function () {
        while(service.hasMore()) {
          queue.shift().retry();
        }
      }
    };

    return service;
  });