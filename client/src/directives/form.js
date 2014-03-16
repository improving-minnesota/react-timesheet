angular.module('form.directives', [])

  // TODO : Create a directive to wrap a form's section header
  // 1. Register a tszFormSectionHeader directive
  // 2. Set the directive to replace the dom element that uses it
  // 3. Set the directive to use transclusion
  // 4. Set an isolate scope that uses the value of the header attribute
  // 5. Register the form-header.html template with the directive

  .directive('tszFieldWrap', function ($compile) {
    return {
      transclude: true,
      restrict: 'A',
      templateUrl: 'assets/templates/directives/form/field-wrapper.html',
      scope : {
        inputId: "@",
        label: "@",
        labelCol: "@",
        fieldCol: "@"
      },
      link: function (scope, element) {

        scope.getLabelCol = function () {
          return scope.labelCol || "2";
        };

        scope.getFieldCol = function () {
          return scope.fieldCol || "4";
        };
      }
    };
  })

  .directive('tszStaticField', function () {
    return {
      replace: true,
      restrict: 'A',
      scope : {
        value: "@",
        inputId: "@",
        label: "@",
        labelCol: "@",
        fieldCol: "@"
      },
      templateUrl: "assets/templates/directives/form/static-field.html",
      link: function (scope, element) {

        scope.getLabelCol = function () {
          return scope.labelCol || "2";
        };

        scope.getFieldCol = function () {
          return scope.fieldCol || "4";
        };
      }
    };
  });
