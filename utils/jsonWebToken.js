const jwt = require('jsonwebtoken');
const configs = require('configs/index');
const { UnauthorizedError, InvalidTokenError, TokenExpiredError } = require('common/error');

function verifyBearerToken(authHeader) {
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, configs.JWT_SECRET_KEY, (err, result) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new TokenExpiredError();
        }
        throw new InvalidTokenError();
      }
      return result;
    });
  } else {
    throw new UnauthorizedError();
  }
}

function signToken(data) {
  return jwt.sign(data, configs.JWT_SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
  verifyBearerToken,
  signToken
};
