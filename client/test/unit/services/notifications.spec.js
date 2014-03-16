describe('Notifications services:', function() {
  var expect = chai.expect;
  var notifications,
    spies;

  beforeEach(module(
    // TODO : set notifications.services as a dependency
  ));

  beforeEach(inject(function($injector) {
    // TODO : inject notifications service

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

    // TODO : verify it should set showCloseButton to true on the message
    // TODO : verify it extends the message object with the passed in config
    // TODO : verify it should post the message via Messenger

  });

  describe('posting an error', function () {
    // TODO : verify it should post an error message
  });

  describe('success', function () {
    // TODO : verify it should post a success message'
  });

  describe('info', function () {
    // TODO : verify it should post an info message
  });
});
