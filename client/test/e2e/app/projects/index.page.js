function ProjectsIndexPage() {

  this.get = function () {
    browser.get('#/app/projects');
  };

  this.pageTitle = element(by.binding('$state.current.data.section'));
  this.getPageTitle = function () {
    return this.pageTitle.getText();
  };

  this.newProjectButton = element(by.buttonText("New Project"));
  this.clickNewProject = function () {
    this.newProjectButton.click();
  };

  this.firstProject = element(by.repeater('project in pageConfig.data').row(0));
  this.clickFirstProject = function () {
    this.firstProject.click();
  };

  this.deleteFirstProject = function () {
    this.firstProject.findElement(by.buttonText('Delete')).click();
  };

  this.restoreFirstProject = function () {
    this.firstProject.findElement(by.buttonText('Restore')).click();
  };
}

module.exports = new ProjectsIndexPage();