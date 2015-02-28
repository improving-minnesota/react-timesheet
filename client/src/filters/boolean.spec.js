describe('Boolean filter: ', function () {

  var BooleanFilter;

  beforeEach(function () {
    BooleanFilter = require('./boolean');
  });

  it('should instantiate the BooleanFilter', function () {
    expect(BooleanFilter).to.be.defined;
  });
});


// describe('Boolean filters:', function () {
//
//   beforeEach(module('boolean.filters'));
//
//   describe('yesNo', function() {
//     var yesNoFilter;
//
//     beforeEach(inject(function($injector) {
//       yesNoFilter = $injector.get('yesNoFilter');
//     }));
//
//     it('should display "Yes" for boolean true', function() {
//       expect(yesNoFilter(true)).to.equal('Yes');
//     });
//
//     it('should display "No" for boolean false', function() {
//       expect(yesNoFilter(false)).to.equal('No');
//     });
//
//     it('should display "N/A" for undefined', function() {
//       expect(yesNoFilter(undefined)).to.equal('N/A');
//     });
//
//     it('should display "N/A" for null', function() {
//       expect(yesNoFilter(null)).to.equal('N/A');
//     });
//
//   });
// });
