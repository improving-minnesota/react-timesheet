describe('Timesheet directives', function () {
  
  var expect = chai.expect;

  var element, 
    $scope,
    $compile,
    $httpBackend;

  beforeEach(module(
    // TODO : Set up module dependencies
  ));

  beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_, $injector) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  describe('tszWeeklyProgressBar', function () {

   // TODO : set up the directive for testing
    // 1. Assign values for hoursWorked and hoursRequired on scope
    // 2. Create an angular.element that uses the progress bar directive
    // 3. Compile the element and call the compiling function with scope
    // 4. Fire a $digest
    // 5. Call an $apply on scope

    // TODO : Test what happens with the progress bar <= 100%
    // 1. verify it should set the progress bar width to the percent complete'
    // 2. verify it should set the progress bar contents to the percent complete

    // TODO : Test what happens with the progress bar > 100%
    // 1. Set the hoursWorked to be double hoursRequired
    // 2. verify it should set the progress bar width to 100% complete
    // 3. verify it should set the progress bar contents to the percent complete'
  });
});