jest.dontMock('./login');
jest.dontMock('../../stores/login.store');

describe('Login Component: ', function () {

  var Login;

  beforeEach(function () {
    Login = require('./login');
  });

  it('should instantiate the Login', function () {
    expect(Login).toBeDefined();
  });
});
