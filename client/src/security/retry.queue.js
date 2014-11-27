var q = require('q');
var _ = require('lodash');

var queue = [];

module.exports = {
  // The security this puts its own handler in here!
  onItemAddedCallbacks: [],

  hasMore: function () {
    return queue.length > 0;
  },

  push: function (retryItem) {
    queue.push(retryItem);
    // Call all the onItemAdded callbacks
    _.each(this.onItemAddedCallbacks, function (cb) {
      try {
        cb(retryItem);
      } catch(e) {
        console.log('retryQueue.push(retryItem): callback threw an error' + e);
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
        q.when(retryFn())
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
    this.push(retryItem);
    return deferred.promise;
  },

  retryReason: function () {
    return this.hasMore() && queue[0].reason;
  },

  cancelAll: function () {
    while(this.hasMore()) {
      queue.shift().cancel();
    }
  },

  retryAll: function () {
    while(this.hasMore()) {
      queue.shift().retry();
    }
  }
};
