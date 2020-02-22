const validator = require('validator');

const isValidEmail = (email) => validator.isEmail(email);

module.exports = {
  isValidEmail,
};
