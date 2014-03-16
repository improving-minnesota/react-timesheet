describe('Security interceptor', function() {
  var expect = chai.expect;

  var queue, 
    interceptor;

  beforeEach(
    module(
      'security.interceptors',
      'security.services'
    ));

  beforeEach(inject(function($injector) {
    queue = $injector.get('retryQueue');
    interceptor = $injector.get('securityInterceptor');
  }));

  it('accepts a response object and returns a promise', function() {
    var promise = interceptor.responseError({status: 200});
    expect(promise.then).to.exist;
  });

  it('does not intercept non-401 error responses', function() {
    var httpResponse = {
      status: 400
    };
    var promise = interceptor.responseError(httpResponse);
    expect(promise.then).to.exist;
  });

  it('intercepts 401 error responses and adds it to the retry queue', function() {
    var notAuthResponse = {
      status: 401,
      config: {}
    };
    interceptor.responseError(notAuthResponse);
    expect(queue.hasMore()).to.be.true;
    expect(queue.retryReason()).to.equal('unauthorized-server');
  });

  it('intercepts 403 error responses and adds it to the retry queue', function() {
    var notAuthResponse = {
      status: 403
    };
    interceptor.responseError(notAuthResponse);
    expect(queue.hasMore()).to.be.true;
    expect(queue.retryReason()).to.equal('access-denied-server');
  });
});
