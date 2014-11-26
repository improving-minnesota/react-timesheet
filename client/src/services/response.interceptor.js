var queue;

module.exports = {
  validate: function (res) {

    if (res.status === 401 && res.req.url !== '/login') {
      return queue.pushRetryFn('unauthorized-server', function retryRequest() {
        return $injector.get('$http')(response.config);
      });
    }
    else if (res.status === 403) {
      return queue.pushRetryFn('access-denied-server', function retryRequest() {
        return $injector.get('$http')(response.config);
      });
    }
  }
};
