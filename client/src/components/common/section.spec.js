jest.dontMock('./section');

describe('Section Component: ', function () {

  var Section;

  beforeEach(function () {
    Section = require('./section');
  });

  it('should instantiate the Section', function () {
    expect(Section).toBeDefined();
  });
});
