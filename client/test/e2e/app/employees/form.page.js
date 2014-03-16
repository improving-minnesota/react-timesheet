function EmployeesFormPage() {
  var self = this;

  // TODO : Create a function to return the section page title

  this.getSaveButton = function (buttonText) {
    return element(by.buttonText(buttonText));
  };

  this.cancelButton = element(by.buttonText('Cancel'));
  
  // TODO : Create a function to click the cancel button 

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