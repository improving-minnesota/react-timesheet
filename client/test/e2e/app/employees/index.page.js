function EmployeesIndexPage() {

  this.get = function () {
    browser.get('#/app/employees');
  };
  
  this.pageTitle = element(by.binding('$state.current.data.section'));
  this.getPageTitle = function () {
    return this.pageTitle.getText();
  };

  this.newEmployeeButton = element(by.buttonText("New Employee"));
  // TODO : Create a function to click the New Employee button

  this.firstEmployee = element(by.repeater('employee in pageConfig.data').row(0));
  // TODO : Create a function to click the first employee in the table
  // TODO : Create a function to click the delete button
  // TODO : Create a functino to click the restore button
}

module.exports = new EmployeesIndexPage();