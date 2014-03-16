describe('Notifications services:', function() {
  var expect = chai.expect;
  var notifications,
    spies;

  beforeEach(module(
    'notifications.services'
  ));

  beforeEach(inject(function($injector) {
    notifications = $injector.get('notifications');

    spies = {
      post: sinon.spy()
    };

    window.Messenger = function Messenger() {
      return {
        post: function (message) {
          spies.post(message);
        }
      };
    };

  }));

  describe('posting a message', function () {
    it('should set showCloseButton to true on the message', function () {
      var message = {};
      notifications.message(message, {});
      expect(message.showCloseButton).to.be.true;
    });

    it('extend the message object with the passed in config', function () {
      var message = {};
      notifications.message(message, {config: true});
      expect(message.config).to.be.true;
    });

    it('should post the message via Messenger', function () {
      notifications.message({message: 'allo'}, {config: true});
      expect(spies.post).to.have.been.called;
      expect(spies.post).to.have.been.calledWith({
        message: 'allo', 
        config: true, 
        showCloseButton: true
      });
    });
  });

  describe('posting an error', function () {
    it('should post an error message', function () {
      notifications.error('oh noze');
      expect(spies.post).to.have.been.calledWith({
        message: 'oh noze', 
        type: 'error', 
        showCloseButton: true, 
        id: 'error-message'
      });
    });
  });

  describe('success', function () {
    it('should post a success message', function () {
      notifications.success('i can haz');
      expect(spies.post).to.have.been.calledWith({
        message: 'i can haz', 
        type: 'success', 
        showCloseButton: true, 
        id: 'success-message'
      });
    });
  });

  describe('info', function () {
    it('should post an info message', function () {
      notifications.info('info');
      expect(spies.post).to.have.been.calledWith({
        message: 'info', 
        type: 'info', 
        showCloseButton: true,
        id: 'info-message'
      });
    });
  });
});
