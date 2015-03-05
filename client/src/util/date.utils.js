// The dateUtils service provides utilties for handling dates that are contained in a
// server response.
var _ = require('lodash');

module.exports = {

  nullOrUndefined : function nullOrUndefined(dateString) {
    return (_.isUndefined(dateString) || dateString === null ? 'None' : false);
  }
};
