describe('Security', function () {
  var ptor;

  describe("An unauthenticated user that opens the application", function () {
    beforeEach (function () {
      browser.get("/");
      ptor = protractor.getInstance();
    });

    it('should be redirected to the login page', function () {
      var loginForm = by.name('loginForm');
      expect(ptor.isElementPresent(loginForm)).toBe(true);
    });

    it('should be able to login', function () {
      element(by.model('user.username')).sendKeys('admin');
      element(by.model('user.password')).sendKeys('password');
      element(by.css('form button')).click();

      browser.sleep(1.0);

      var logout = by.css('a.logout');
      expect(ptor.isElementPresent(logout)).toBe(true);
    });
  });
});
