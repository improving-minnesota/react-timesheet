var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Snackbar Component: ', function () {

  var Snackbar;

  beforeEach(function () {
    Snackbar = require('./snackbar');
  });

  it('should instantiate the Snackbar', function () {
    expect(Snackbar).to.be.defined;
  });
});
