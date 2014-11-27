module.exports = {

  validate: function (field) {

  },

  text: {

    minLength: function (field) {
      return field.value && field.value.length > field.minLength;
    },

    maxLength: function (field) {
      return field.value && field.value.length < field.maxLength;
    }
  }
};
