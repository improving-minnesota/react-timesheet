describe('Notifications Store: ', function () {

  var SnackbarStore;

  beforeEach(function () {
    SnackbarStore = require('./snackbar.store');
  });

  it('should instantiate the SnackbarStore', function () {
    expect(SnackbarStore).to.be.defined;
  });
});
