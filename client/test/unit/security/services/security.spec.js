describe('Security Services', function() {
  var expect = chai.expect;
  var queue;

  function mockRetryItem() {
    return jasmine.createSpyObj('retryItem', ['retry', 'cancel']);
  }

  beforeEach(module(
    'security.services'
  ));

  beforeEach(inject(function($injector) {
    queue = $injector.get('retryQueue');
  }));

  describe('Retry Queue', function () {
    describe('hasMore', function() {
      
      it('initially has no items to retry', function() {
        expect(queue.hasMore).to.exist;
        expect(queue.hasMore()).to.be.false;
      });

      it('has more items once one has been pushed', function() {
        queue.push(mockRetryItem());
        expect(queue.hasMore()).to.be.true;
      });
    });

    describe('pushRetryFn', function() {

      it('adds a new item to the queue', function() {
        queue.pushRetryFn(function() {});
        expect(queue.hasMore()).to.be.true;
      });

      it('adds a reason to the retry', function() {
        var reason = 'SOME_REASON';
        queue.pushRetryFn(reason, function() {});
        expect(queue.retryReason()).to.equal(reason);
      });

      it('does not add a reason to the retry if not specified', function() {
        queue.pushRetryFn(function() {});
        expect(queue.retryReason()).to.be.undefined;
      });
    });

    describe('retryAll', function() {
      it('should not fail if the queue is empty', function(){
        queue.retryAll(function(item) {});
      });

      it('should empty the queue', function() {
        queue.push(mockRetryItem());
        queue.push(mockRetryItem());
        queue.push(mockRetryItem());
        expect(queue.hasMore()).to.be.true;
        queue.retryAll(function(item) {});
        expect(queue.hasMore()).to.be.false;
      });

    });

    describe('cancelAll', function() {

      it('should empty the queue', function() {
        queue.push(mockRetryItem());
        queue.push(mockRetryItem());
        queue.push(mockRetryItem());
        expect(queue.hasMore()).to.be.true;
        queue.cancelAll(function(item) {});
        expect(queue.hasMore()).to.be.false;
      });

    });
  });
});
