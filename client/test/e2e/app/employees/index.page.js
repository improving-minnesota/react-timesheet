function EmployeesIndexPage() {

  this.get = function () {
    browser.get('#/app/employees');
  };
  
  this.pageTitle = element(by.binding('$state.current.data.section'));
  this.getPageTitle = function () {
    return this.pageTitle.getText();
  };

  this.newEmployeeButton = element(by.buttonText("New Employee"));
  this.clickNewEmployee = function () {
    this.newEmployeeButton.click();
  };

  this.firstEmployee = element(by.repeater('employee in pageConfig.data').row(0));
  this.clickFirstEmployee = function () {
    this.firstEmployee.click();
  };
  this.deleteFirstEmployee = function () {
    this.firstEmployee.findElement(by.buttonText('Delete')).click();
  };
  this.restoreFirstEmployee = function () {
    this.firstEmployee.findElement(by.buttonText('Restore')).click();
  };
}

module.exports = new EmployeesIndexPage();