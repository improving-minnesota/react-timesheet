var api = require('./api');

module.exports = {

  init : function () {

    api.add({
      resource: 'employees',
      url: '/users'
    });

    api.add({
      resource: 'projects',
      url: '/projects'
    });

    api.add({
      resource: 'timesheets',
      url: '/users/:user_id/timesheets',
      params: {
        user_id: '@user_id'
      }
    });
  }
};
