var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Paginator : ', function () {

  var Paginator;

  beforeEach(function () {
    Paginator = require('./paginator');
  });

  it('should instantiate the Paginator', function () {
    expect(Paginator).to.be.defined;
  });
});
