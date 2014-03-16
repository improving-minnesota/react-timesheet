describe('Authorization', function() {
  var $rootScope, 
    security, 
    authorization, 
    authentication, 
    queue,
    securityContextResponse, 
    resolved,
    spies;
  
  var expect = chai.expect;

  angular.module('test', []).value('I18N.MESSAGES', {});
  
  beforeEach(
    module(
      'test',
      'ui.router',
      'security.services',
      'app.resources',
      'ngResource',
      'notifications.services',
      'authorization.services', 
      'assets/templates/security/login.html'
    ));
  
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    authorization = $injector.get('authorization');
    authentication = $injector.get('authentication');
    securityContext = $injector.get('securityContext');
    queue = $injector.get('retryQueue');
    
    securityContextResponse = { authenticated: true, user: { _id: '1234567890', email: 'jo@bloggs.com', firstName: 'Jo', lastName: 'Bloggs', admin: true} };
    resolved = false;

    spies = {
      currentUser : sinon.stub(authentication, 'requestCurrentUser', function () {
        securityContext.setAuthentication(securityContextResponse);
        // You will need to call $digest to resolve the promise. 
        return $injector.get('$q').when(securityContext);
      }) 
    };
  }));

  describe('requireAuthenticatedUser', function() {
    
    it('makes a GET request to current user url', function() {
      expect(securityContext.authenticated).to.be.false;

      authorization.requireAuthenticatedUser()
        .then(function(data) {
          resolved = true;
          expect(securityContext.authenticated).to.be.true;
          expect(securityContext.user._id).to.equal(securityContextResponse.user._id);
        });

      $rootScope.$digest();
      expect(resolved).to.be.true;
    });

    it('adds a new item to the retry queue if not authenticated', function () {
      securityContextResponse = securityContext.reset();
      expect(queue.hasMore()).to.be.false;

      authorization.requireAuthenticatedUser()
        .then(function() {
          resolved = true;
        });

      $rootScope.$digest();
      expect(securityContext.authenticated).to.be.false;
      expect(queue.hasMore()).to.be.true;
      expect(queue.retryReason()).to.equal('unauthenticated-client');
      expect(resolved).to.be.false;
    });

  });
});
  