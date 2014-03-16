function EmployeesFormPage() {
  var self = this;

  this.pageTitle = element(by.binding('$state.current.data.section'));
  this.getPageTitle = function () {
    return this.pageTitle.getText();
  };

  this.getSaveButton = function (buttonText) {
    return element(by.buttonText(buttonText));
  };

  this.cancelButton = element(by.buttonText('Cancel'));
  this.cancelForm = function () {
    this.cancelButton.click();
  };

  this.saveForm = function (saveButtonText) {
    this.getSaveButton(saveButtonText).click();
  };

  this.enterValue = function (model, value) {
    var field = element(by.model(model));
    field.clear();
    field.sendKeys(value);
    return self;
  };

  this.clickAdmin = function () {
    element(by.model('employee.admin')).click();
    return self;
  };

  this.successMessage = function () {
    return $('.messenger-shown > .message-success > .messenger-message-inner').getText();
  };

  this.errorMessage = function () {
    return element(by.id("error-message")).getText();
  };
}

module.exports = new EmployeesFormPage();