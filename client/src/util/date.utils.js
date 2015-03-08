var _ = require('lodash');
var moment = require('moment');

module.exports = {

  // Nov 18, 2013
  momentShortDate: function (dateString) {
    return this.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
  },

  // November 18th, 2013
  momentLongDate :function (dateString) {
    return this.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
  },

  nullOrUndefined : function nullOrUndefined(dateString) {
    return (_.isUndefined(dateString) || dateString === null ? 'None' : false);
  }
};
