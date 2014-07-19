describe('Progress Interceptors', function() {
  var expect = chai.expect;

  var queue, 
    interceptor,
    spies,
    success,
    rejection;

  beforeEach(module(
    'progress.interceptors'
  ));

  beforeEach(inject(function($injector) {
    interceptor = $injector.get('nProgressInterceptor');

    spies = {
      start : sinon.spy(NProgress, 'start'),
      done  : sinon.spy(NProgress, 'done')
    };

    success = {status: 200};
    rejection = {reason: 'too bad so sad'};

  }));

  afterEach(function () {
    spies.start.restore();
    spies.done.restore();
  });

  describe('request', function () {

    it('should start the progress bar', function () {
      interceptor.request(success);
      expect(spies.start).to.have.been.called;
    });

    it('should return a promise containing the config object', function () {
      var promise = interceptor.request(success);
      expect(promise.then).to.exist;
      expect(promise).to.eventually.equal(success);
    });

  });

  describe('requestError', function () {

    it('should stop the progress bar', function () {
      interceptor.requestError(rejection);
      expect(spies.done).to.have.been.called;
    });

    it('should reject the promise with the rejection config', function () {
      var promise = interceptor.requestError(rejection);
      expect(promise).to.have.been.rejectedWith(rejection);
    });

  });

  describe('response', function () {

    it('should stop the progress bar', function () {
      interceptor.response(success);
      expect(spies.done).to.have.been.called;
    });

    it('should return a promise with the response object', function () {
      var promise = interceptor.response(success);
      expect(promise).to.eventually.equal(success);
    });

  });

  describe('responseError', function () {

    it('should stop the progress bar', function () {
      interceptor.responseError(rejection);
      expect(spies.done).to.have.been.called;
    });

    it('should reject the promise with the rejection config', function () {
      var promise = interceptor.responseError(rejection);
      expect(promise).to.have.been.rejectedWith(rejection);
    });
  });

});
