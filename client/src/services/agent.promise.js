var q = require('q');
var NProgress = require('nprogress');

function wrap(superagent) {
  /**
   * Request object similar to superagent.Request, but with end() returning
   * a promise.
   */
  function QRequest() {
    superagent.Request.apply(this, arguments);
  }

  // Inherit form superagent.Request
  QRequest.prototype = Object.create(superagent.Request.prototype);

  /** Send request and get a promise that `end` was emitted */
  QRequest.prototype.end = function(cb) {
    var _super = superagent.Request.prototype.end;
    var context = this;
    var deferred = q.defer();

    NProgress.start();

    _super.call(context, function(err, res) {

      if (err) {
        return deferred.reject(err);
      }

      if (res.error) {
        return deferred.reject(res.error);
      }

      return deferred.resolve(res);
    });

    return deferred.promise
      .finally(NProgress.done);
  };

  /**
   * Request builder with same interface as superagent.
   * It is convenient to import this as `request` in place of superagent.
   */
  var request = function(method, url) {
    return new QRequest(method, url);
  };

  request.wrap = wrap;

  /** Helper for making a get request */
  request.get = function(url, data) {
    var req = request('GET', url);
    if (data) {
      req.query(data);
    }
    return req;
  };

  /** Helper for making a head request */
  request.head = function(url, data) {
    var req = request('HEAD', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a delete request */
  request.del = function(url) {
    return request('DELETE', url);
  };

  /** Helper for making a patch request */
  request.patch = function(url, data) {
    var req = request('PATCH', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a post request */
  request.post = function(url, data) {
    var req = request('POST', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a put request */
  request.put = function(url, data) {
    var req = request('PUT', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  // Export the request builder
  return request;
}

module.exports = wrap(require('superagent'));
