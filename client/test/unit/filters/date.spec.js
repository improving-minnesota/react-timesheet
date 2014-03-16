describe('Date filters:', function () {
  var expect = chai.expect;

  beforeEach(module('date.filters'));

  describe('momentShortDate', function () {
    var momentShortDateFilter;

    beforeEach(inject(function($injector) {
      momentShortDateFilter = $injector.get('momentShortDateFilter');
    }));

    it('should display "Nov 15, 2010" for 2010-11-15', function() {
      expect(momentShortDateFilter("2010-11-15")).to.equal('Nov 15, 2010');
    });

    it('should display "Jan 30, 2013" for 2013-01-30', function() {
      expect(momentShortDateFilter("2013-01-30")).to.equal('Jan 30, 2013');
    });

    it('should display "None" for a null date', function() {
      expect(momentShortDateFilter(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(momentShortDateFilter(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(momentShortDateFilter("not a date")).to.equal('Invalid date');
    });
  });

  describe('momentLongDate', function () {
    var momentLongDateFilter;

    beforeEach(inject(function($injector) {
      momentLongDateFilter = $injector.get('momentLongDateFilter');
    }));

    it('should display "November 15th, 2010" for 2010-11-15', function() {
      expect(momentLongDateFilter("2010-11-15")).to.equal('November 15th, 2010');
    });

    it('should display "January 30th, 2013" for 2013-01-30', function() {
      expect(momentLongDateFilter("2013-01-30")).to.equal('January 30th, 2013');
    });

    it('should display "None" for a null date', function() {
      expect(momentLongDateFilter(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(momentLongDateFilter(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(momentLongDateFilter("not a date")).to.equal('Invalid date');
    });
  });

});
