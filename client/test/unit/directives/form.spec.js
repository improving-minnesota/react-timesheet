describe('Form directives', function () {
  
  var expect = chai.expect;

  var element, 
    $scope,
    $compile,
    $httpBackend;

  beforeEach(module(
    'form.directives',
    'ngResource',
    // TODO : set the section header template as a dependency
    'assets/templates/directives/form/field-wrapper.html',
    'assets/templates/directives/form/static-field.html'
  ));

  beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_, $injector) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  describe('tszFormSectionHeader', function () {

    beforeEach(function () {
      $scope.headerName = 'My Header';
      $scope.content = 'My Content';

      // TODO : Prepare the directive for testing
      // 1. Create an element that uses the directive
      // 2. Compile the element with scope
      // 3. Run a $digest on scope
      // 4. Run an $apply on scope
    });

    describe('header attribute', function() {

      // TODO : verify it should set the header content within the directive template
      // TODO : verify it should respond to changes

    });
    
    describe('transcluded contents', function() {

      // TODO : verify it should transclude the directive element contents
      // TODO : verify it should respond to changes
      
    });

    
  });

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