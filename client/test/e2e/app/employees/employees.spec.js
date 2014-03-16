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
      it('takes us to the create employee form', function () {
        indexPage.clickNewEmployee();
        expect(formPage.getPageTitle()).toBe("Create Employee");
      });
    });

    describe("selecting an employee", function () {
      it('takes us to the employee detail page', function () {
        indexPage.clickFirstEmployee();
        expect(formPage.getPageTitle()).toBe("Update Employee");
      });
    });

    describe("deleting an employee", function () {

      it('should fade the employee row', function () {
        indexPage.deleteFirstEmployee();
        expect(indexPage.firstEmployee.getAttribute('class')).toContain('faded');
      });

      it('should change the action button text', function () {
        expect(indexPage.firstEmployee.element(by.buttonText('Restore')).isPresent()).toBe(true);
      });
    });

    describe("restoring an employee", function () {

      it('should set the row back to normal', function () {
        indexPage.restoreFirstEmployee();
        expect(indexPage.firstEmployee.getAttribute('class')).not.toContain('faded');
      });

      it('should restore the action button text', function () {
        expect(indexPage.firstEmployee.element(by.buttonText('Delete')).isPresent()).toBe(true);
      });
    });
  });

  describe('Form Page', function () {

    describe('Update Employee Form', function () {
      beforeEach(function () {
        indexPage.clickFirstEmployee();
      });

      it('should be able to update the employee', function () {

        formPage
          .enterValue('employee.firstName', 'newName')
          .saveForm('Update');

        browser.sleep(2);

        expect(formPage.successMessage()).toContain('Updated employee:');
      });

      it('should return back to the index page on cancel', function () {
        formPage.cancelForm();
        expect(indexPage.getPageTitle()).toBe("Employees");
      });
    });
  });
});
