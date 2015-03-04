var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Snackbar Actions: ', function () {
  var SnackbarActions;

  beforeEach(function () {
    SnackbarActions = require('./snackbar.actions');
  });

  it('should instantiate the SnackbarActions', function () {
    expect(SnackbarActions).to.be.defined;
  });
});
