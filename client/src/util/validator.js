module.exports = {

  validate: function (field) {

  },

  minLength: function (field) {
    return field.value && field.value.length > field.minLength;
  },

  maxLength: function (field) {
    return field.value && field.value.length < field.maxLength;
  },

  email: function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
};
