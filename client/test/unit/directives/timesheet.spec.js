describe('Timesheet directives', function () {
  
  var expect = chai.expect;

  var element, 
    $scope,
    $compile,
    $httpBackend;

  beforeEach(module(
    'timesheet.directives',
    'ngResource',
    'assets/templates/directives/timesheet/progress-bar.html'
  ));

  beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_, $injector) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  describe('tszWeeklyProgressBar', function () {

    beforeEach(function () {
      $scope.hoursWorked = 40;
      $scope.hoursRequired = 100;
      
      element = angular.element(
        '<div tsz-weekly-progress-bar' + 
        '  hours-worked="hoursWorked"'  +
        '  hours-required="hoursRequired"' + 
        '  report="reportStatus(percentComplete)">' + 
        '</div>');

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    describe('progress bar <= 100%', function() {
      it('should set the progress bar width to the percent complete', function () {
        expect(element.find('.progress-bar').css('width')).to.equal('40%');
      });

      it('should set the progress bar contents to the percent complete', function () {
        expect(element.find('.progress-bar').text().trim()).to.equal('40%');
      });
    });

    describe('progress bar > 100%', function() {
      beforeEach(function() {
        $scope.$apply(function() {
          $scope.hoursWorked = 80;
          $scope.hoursRequired = 40;
        });
      });
      
      it('should set the progress bar width to 100% complete', function () {
        expect(element.find('.progress-bar').css('width')).to.equal('100%');
      });

      it('should set the progress bar contents to the percent complete', function () {
        expect(element.find('.progress-bar').text().trim()).to.equal('200%');
      });
    });
  });
});