describe('Date filters:', function () {
  var expect = chai.expect;

  beforeEach(module(
    // TODO : set the module dependency
  ));

  describe('momentShortDate', function () {
    var momentShortDateFilter;

    beforeEach(inject(function($injector) {
     // TODO : inject the moment short date filter
    }));

    // TODO : verify it should display "Nov 15, 2010" for 2010-11-15'
    // TODO : verify it should display "Jan 30, 2013" for 2013-01-30'
    // TODO : verify it should should display "None" for a null date
    // TODO : verify it should display "None" for a undefined date'
    // TODO : verify it should display "Invalid date" for an invalid date'
  });

  describe('momentLongDate', function () {
    var momentLongDateFilter;

    beforeEach(inject(function($injector) {
      // TODO : inject the moment long date filter
    }));

    // TODO : verify it should display "November 15th, 2010" for 2010-11-15'
    // TODO : verify it should display "January 30th, 2013" for 2013-01-30'
    // TODO : verify it should display "None" for a null date'
    // TODO : verify it should display "None" for a undefined date'
    // TODO : verify it should display "Invalid date" for an invalid date'

  });

});