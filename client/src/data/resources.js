var api = require('./api');

module.exports = function () {

  api
    .add({
      resource: 'employees',
      url: '/users',
      params: ['_id']
    })

    .add({
      resource: 'projects',
      params: ['_id']
    })

    .add({
      resource: 'timesheets',
      url: '/users/:user_id/timesheets',
      params: ['_id', 'user_id']
    });
};
