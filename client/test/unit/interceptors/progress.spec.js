describe('Progress Interceptors', function() {
  var expect = chai.expect;

  var queue, 
    interceptor,
    spies,
    success,
    rejection;

  beforeEach(module(
    // TODO : set up the module dependencies
  ));

  beforeEach(inject(function($injector) {
    // TODO : Inject the interceptor 

    spies = {
      // TODO : create spies for NProgress stop and start
    };

    success = {status: 200};
    rejection = {reason: 'too bad so sad'};

  }));

  afterEach(function () {
    // TODO : restore the spies
  });

  describe('request', function () {

    // TODO : verity it should start the progress bar
    // TODO : verify it should return a promise containing the config object

  });

  describe('requestError', function () {

    // TODO : verify it should stop the progress bar
    // TODO : verify it should reject the promise with the rejection config

  });

  describe('response', function () {

    // TODO : verify it should stop the progress bar
    // TODO : verify it should return a promise with the response object'

  });

  describe('responseError', function () {

    // TODO : verify it should stop the progress bar
    // TODO : verify it should reject the promise with the rejection config

  });

});
