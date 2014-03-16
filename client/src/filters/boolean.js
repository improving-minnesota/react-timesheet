angular.module('boolean.filters', [ ])

  .filter('yesNo', function() {
    return function(value) {
      if (_.isBoolean(value)) {
        if (value) {
          return 'Yes';
        } else {
          return 'No';
        }
      } else {
        return 'N/A';
      }
    };
  });