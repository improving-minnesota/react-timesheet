// The dateUtils service provides utilties for handling dates that are contained in a 
// server response. 

angular.module('date.utils.services',  [])
  
  .factory('dateUtils', function () {
    return {
      nullOrUndefined : function nullOrUndefined(dateString) {
        return (!angular.isDefined(dateString) || dateString === null ? 'None' : false);
      }
    };
  });