var _ = require('lodash');

module.exports = function(value) {
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