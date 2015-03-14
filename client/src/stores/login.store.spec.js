describe('Login Store: ', function () {

  var LoginStore;

  beforeEach(function () {
    LoginStore = require('./login.store');
  });

  it('should instantiate the LoginStore', function () {
    expect(LoginStore).to.be.defined;
  });
});
