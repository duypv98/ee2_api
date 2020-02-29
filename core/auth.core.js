const configs = require('configs/index');
const jwt = require('jsonwebtoken');
const User = require('db/models/User');
const { InvalidPasswordError, InvalidUsernameOrEmailError } = require('common/error');
const encryption = require('utils/encryption');

/**
 * Check if given information is correct for login
 * @param {String} usr
 * @param {String} pwd
 * @returns {Object} response data: bearer token with userId if success
 */
async function checkLogin(usr, pwd) {
  let data = {};
  const user = await User.findOne().or([
    { username: usr }, { email: usr }
  ]);
  if (!user) {
    throw new InvalidUsernameOrEmailError();
  }
  if (encryption.isEqual(pwd, user.password_hashed)) {
    const userId = user.get('_id');
    const token = jwt.sign({ uid: userId }, configs.JWT_SECRET_KEY, { expiresIn: '365d' });
    data = {
      userId,
      token,
    };
  } else {
    throw new InvalidPasswordError();
  }
  return data;
}

module.exports = {
  checkLogin,
};
