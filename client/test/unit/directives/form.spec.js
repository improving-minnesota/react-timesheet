describe('Form directives', function () {
  
  var expect = chai.expect;

  var element, 
    $scope,
    $compile,
    $httpBackend;

  beforeEach(module(
    'form.directives',
    'ngResource',
    'assets/templates/directives/form/field-wrapper.html',
    'assets/templates/directives/form/static-field.html'
  ));

  beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_, $injector) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  describe('tszFieldWrap', function () {

    beforeEach(function () {
      $scope.inputId = "my-input-id";
      $scope.labelCol = "5";
      $scope.fieldCol = "8";
      $scope.label = "My Label";

      element = angular.element(
      '<div tsz-field-wrap ' +
        'input-id="{{inputId}}"' +
        'label-col="{{labelCol}}"' +
        'field-col="{{fieldCol}}"' +
        'label="{{label}}"'+
        '>' +
      '</div>'
      );

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    describe('input-id attribute', function() {
      it('should set the "for" attribute of the label', function() {
        expect(element.find('label').attr('for')).to.equal('my-input-id');
      });
    });

    describe('label-col attribute', function() {
      it('should set the number specified by the attribute', function() {
        expect(element.find('label').hasClass('col-sm-5')).to.be.true;
      });
    });

    describe('field-col attribute', function() {
      it('should set the number specified by the attribute', function() {
        expect(element.find('div').hasClass('col-sm-8')).to.be.true;
      });
    });

    describe('label attribute', function() {
      it('should set the label contents', function() {
        expect(element.find('label').text()).to.equal('My Label');
      });
    });

  });

  describe('tszStaticField', function () {
    beforeEach(function () {
      $scope.inputId = "my-input-id";
      $scope.labelCol = "5";
      $scope.fieldCol = "8";
      $scope.label = "My Label";
      $scope.value = "My Value";

      element = angular.element(
      '<div tsz-static-field ' +
        'input-id="{{inputId}}"' +
        'label-col="{{labelCol}}"' +
        'field-col="{{fieldCol}}"' +
        'label="{{label}}"' +
        'value="{{value}}"' +
        '>' +
      '</div>'
      );

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    describe('input-id attribute', function() {
      it('should set the "for" attribute of the label', function() {
        expect(element.find('label').attr('for')).to.equal('my-input-id');
      });
    });

    describe('label-col attribute', function() {
      it('should set the number specified by the attribute', function() {
        expect(element.find('label').hasClass('col-sm-5')).to.be.true;
      });
    });

    describe('field-col attribute', function() {
      it('should set the number specified by the attribute', function() {
        expect(element.find('div').hasClass('col-sm-8')).to.be.true;
      });
    });

    describe('label attribute', function() {
      it('should set the label contents', function() {
        expect(element.find('label').text()).to.equal('My Label');
      });
    });

    describe('static field value attribute', function() {
      it('should set the value', function() {
        expect(element.find('.tsz-form-static-text').text()).to.equal('My Value');
      });
    });
  });
});