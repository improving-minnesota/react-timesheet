var axios = require('axios');
var Promise = require('es6-promise').Promise;
var NProgress = require('nprogress');

module.exports = function () {

  axios.interceptors.request.use(
    function (config) {
      NProgress.start();
      return config;
    },
    function (err) {
      NProgress.done();
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      NProgress.done();
      return response;
    },
    function (err) {
      NProgress.done();
      return Promise.reject(err);
    }
);
};