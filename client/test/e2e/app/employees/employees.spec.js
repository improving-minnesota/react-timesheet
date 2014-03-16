describe('Employees', function () {

  var ptor,
    indexPage = require('./index.page.js'),
    formPage = require('./form.page.js');

  beforeEach (function () {
    indexPage.get();
    ptor = protractor.getInstance();
  });

  describe('List Page', function () {

    describe("clicking new employee", function () {
      // TODO: Verify it takes us to the create employee form
    });

    describe("selecting an employee", function () {
      // TODO: Verify it takes us to the employee detail page'
    });

    describe("deleting an employee", function () {

      // TODO : Verify the row is faded
      // TODO : Verify the action button has changed. 

    });

    describe("restoring an employee", function () {

      // TODO : Verify the row is back to normal
      // TODO : Verify the action button is restored

    });
  });

  describe('Form Page', function () {

    describe('Update Employee Form', function () {
      beforeEach(function () {
        indexPage.clickFirstEmployee();
      });

      // TODO: Verify the employee can be updated
      // TODO: Verify the user is returned to the index page on cancel
      
    });
  });
});
