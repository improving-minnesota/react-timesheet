var dateUtils = require('../services/date.utils');

module.exports = {

  // Nov 18, 2013
  momentShortDate: function (dateString) {
    return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
  },

  // November 18th, 2013
  momentLongDate :function (dateString) {
    return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
  }
};
