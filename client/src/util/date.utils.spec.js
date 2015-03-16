describe('Date Utils: ', function () {

  var DateUtils;

  beforeEach(function () {
    DateUtils = require('./date.utils');
  });

  it('should instantiate the DateUtils', function () {
    expect(DateUtils).to.be.defined;
  });

  describe('momentShortDate', function () {

    it('should display "Nov 15, 2010" for 2010-11-15', function() {
      expect(DateUtils.momentShortDate("2010-11-15")).to.equal('Nov 15, 2010');
    });

    it('should display "Jan 30, 2013" for 2013-01-30', function() {
      expect(DateUtils.momentShortDate("2013-01-30")).to.equal('Jan 30, 2013');
    });

    it('should display "None" for a null date', function() {
      expect(DateUtils.momentShortDate(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(DateUtils.momentShortDate(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(DateUtils.momentShortDate("not a date")).to.equal('Invalid date');
    });
  });

  describe('momentLongDate', function () {

    it('should display "November 15th, 2010" for 2010-11-15', function() {
      expect(DateUtils.momentLongDate("2010-11-15")).to.equal('November 15th, 2010');
    });

    it('should display "January 30th, 2013" for 2013-01-30', function() {
      expect(DateUtils.momentLongDate("2013-01-30")).to.equal('January 30th, 2013');
    });

    it('should display "None" for a null date', function() {
      expect(DateUtils.momentLongDate(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(DateUtils.momentLongDate(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(DateUtils.momentLongDate("not a date")).to.equal('Invalid date');
    });
  });
});

