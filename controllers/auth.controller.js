const asyncRoute = require('utils/asyncRoute');
const User = require('db/models/User');
const { InvalidUsernameOrEmailError, InvalidPasswordError } = require('common/error');
const encryption = require('utils/encryption');
const jsonWebToken = require('utils/jsonWebToken');

const login = asyncRoute(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne().or([
    { username }, { email: username }
  ]);
  if (!user) throw new InvalidUsernameOrEmailError();
  if (encryption.isEqual(password, user.password_hashed)) {
    const userId = user.get('_id');
    const token = jsonWebToken.signToken({ uid: userId });
    res.json({ data: { userId, token } });
  }
  throw new InvalidPasswordError();
});

module.exports = { login };
