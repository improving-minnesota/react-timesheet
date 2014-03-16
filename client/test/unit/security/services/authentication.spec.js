describe('Authentication', function() {
  var expect = chai.expect;

  var $rootScope, 
    $http, 
    $httpBackend, 
    $state, 
    status, 
    userInfo,
    service,
    securityContext,
    queue;
  
  angular.module('test',[]).constant('I18N.MESSAGES', messages = {});

  beforeEach(
    module(
      'test', 
      'ngResource',
      'app.resources',
      'app.security',
      'security.services',
      'assets/templates/security/login.html',
      'notifications.services',
      'authentication.services'
    ));

  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$http_, _$state_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    $state = _$state_;

    userInfo = {_id: '1234567890', email: 'jo@bloggs.com', firstName: 'Jo', lastName: 'Bloggs', admin: true};
    $httpBackend.when('GET', '/login').respond(200, { authenticated: true, user: userInfo }); 
  })); 

  beforeEach(inject(function($injector) {
    authentication = $injector.get('authentication');
    securityContext = $injector.get('securityContext');
    queue = $injector.get('retryQueue');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('login', function() {

    it('sends a http request to login the specified user', function() {
      $httpBackend.when('POST', '/login').respond(200, { authenticated: true, user: userInfo }); 
      $httpBackend.expect('POST', '/login');
      
      authentication.login('email', 'password');
      
      $httpBackend.flush();
      expect(securityContext.user.id).to.equal(userInfo.id);
    });

    it('calls queue.retry on a successful login', function() {
      $httpBackend.when('POST', '/login').respond(200, { authenticated: true, user: userInfo }); 
      var spy = sinon.spy(queue, 'retryAll');
      
      authentication.login('email', 'password');
      
      $httpBackend.flush();
      $rootScope.$digest();
      expect(spy.called).to.be.true;
      expect(securityContext.user._id).to.equal(userInfo._id);
    });

    it('does not call queue.retryAll after a login failure', function() {
      $httpBackend.when('POST', '/login').respond(403, { user: null });
      var spy = sinon.spy(queue, 'retryAll');
      
      expect(spy.called).to.be.false;
      authentication.login('email', 'password');
      $httpBackend.flush();
      expect(spy.called).to.be.false;
    });
  });

  describe("currentUser", function() {

    it("should be unauthenticated to begin with", function() {
      expect(securityContext.authenticated).to.be.false;
    });

    it("should be authenticated if we update with user info", function() {
      var contextInfo = {authenticated: true, user: {_id: 1}};
      securityContext.setAuthentication(contextInfo);
      expect(securityContext.authenticated).to.be.true;
      expect(securityContext.user._id).to.equal(contextInfo.user._id);
    });

    it("should not be authenticated if we reset the securityContext", function() {
      var userInfo = { authenticated: true, user: {_id: 1} };
      securityContext.setAuthentication(userInfo);
      expect(securityContext.authenticated).to.be.true;
      expect(securityContext.user._id).to.equal(userInfo.user._id);

      securityContext.reset();
      expect(securityContext.authenticated).to.be.false;
      expect(securityContext.user._id).to.be.undefined;
    });
  });

  describe('requestCurrentUser', function() {
    
    it('makes a GET request to retrieve the current user', function() {
      expect(securityContext.authenticated).to.be.false;
      $httpBackend.expect('GET', '/login');

      authentication.requestCurrentUser().then(function(data) {
        resolved = true;
        expect(securityContext.authenticated).to.be.true;
      expect(securityContext.user._id).to.equal(userInfo._id);
      });
      
      $httpBackend.flush();
      expect(resolved).to.be.true;
    });

    it('returns the current user immediately if they are already authenticated', function() {
      userInfo = {authenticated: true, user: {_id: 1}};
      securityContext = userInfo;
      expect(securityContext.authenticated).to.be.true;
      authentication.requestCurrentUser().then(function(data) {
        resolved = true;
        expect(securityContext.user._id).to.equal(userInfo.user._id);
      });

      $httpBackend.flush();
      expect(resolved).to.be.true;
    });
  });

});