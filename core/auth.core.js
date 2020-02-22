/* eslint-disable object-shorthand */
const configs = require('configs/index');
const jwt = require('jsonwebtoken');
const encryption = require('utils/encryption');
const { InvalidPasswordError, InvalidUsernameOrEmailError } = require('common/error');
const userODM = require('db/odm/user.odm');

/**
 * Check if given information is correct for login
 * @param {String} usr
 * @param {String} pwd
 * @returns {Object} response data: bearer token with userId if success
 */
async function checkLogin(usr, pwd) {
  let data = {};
  const user = await userODM.findByUsernameOrEmail(usr);
  if (!user) {
    throw new InvalidUsernameOrEmailError();
  }
  if (encryption.isEqual(pwd, user.password_hashed)) {
    const userId = user.get('_id');
    const token = jwt.sign({ uid: userId }, configs.JWT_SECRET_KEY, { expiresIn: '365d' });
    data = {
      userId: userId,
      token: token,
    };
  } else {
    throw new InvalidPasswordError();
  }
  return data;
}

module.exports = {
  checkLogin,
};
