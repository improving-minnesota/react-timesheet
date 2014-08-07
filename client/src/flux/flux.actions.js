var constants = require('flux.constants');

module.exports = {

  timesheet: {
    add: function (timesheet) {
      this.dispatch(constants.ADD_TIMESHEET, {});
    }
  }
};