describe('Projects', function () {
  var ptor,
    indexPage = require('./index.page.js'),
    formPage = require('./form.page.js');

  beforeEach (function () {
    indexPage.get();
    ptor = protractor.getInstance();
  });

  describe('List Page', function () {

    describe("clicking new project", function () {
      it('takes us to the create project form', function () {
        indexPage.clickNewProject();
        expect(formPage.getPageTitle()).toBe("Create Project");
      });
    });

    describe("selecting a project", function () {
      it('takes us to the project detail page', function () {
        indexPage.clickFirstProject();
        expect(formPage.getPageTitle()).toBe("Project Details");
      });
    });

    describe("deleting a project", function () {

      it('should fade the project row', function () {
        indexPage.deleteFirstProject();
        expect(indexPage.firstProject.getAttribute('class')).toContain('faded');
      });

      it('should change the action button text', function () {
        expect(indexPage.firstProject.element(by.buttonText('Restore')).isPresent()).toBe(true);
      });
    });

    describe("restoring a project", function () {

      it('should set the row back to normal', function () {
        indexPage.restoreFirstProject();
        expect(indexPage.firstProject.getAttribute('class')).not.toContain('faded');
      });

      it('should restore the action button text', function () {
        expect(indexPage.firstProject.element(by.buttonText('Delete')).isPresent()).toBe(true);
      });
    });
  });

  describe('Form Page', function () {

    describe('Update Project Form', function () {
      beforeEach(function () {
        indexPage.clickFirstProject();
      });

      it('should be able to update the project', function () {

        formPage
          .enterValue('project.name', 'newProjectName')
          .saveForm('Update');

        browser.sleep(2);

        expect(formPage.successMessage()).toContain('Updated project: ');
      });

      it('should return back to the index page on cancel', function () {
        browser.debugger();
        formPage.cancelForm();
        expect(indexPage.getPageTitle()).toBe("Projects");
      });
    });
  });

});