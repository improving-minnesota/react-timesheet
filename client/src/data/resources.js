var api = require('./api');

module.exports = function () {

  api
    .add({
      resource: 'employees',
      url: '/users'
    })

    .add({
      resource: 'projects'
    })

    .add({
      resource: 'timesheets',
      url: '/users/:user_id/timesheets',
      params: {
        user_id: '@user_id'
      }
    });
};
