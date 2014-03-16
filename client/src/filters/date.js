angular.module('date.filters', [
  'date.utils.services'
])

  // Nov 18, 2013
  .filter('momentShortDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
    };
  })

  // November 18th, 2013
  .filter('momentLongDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
    };
  });
