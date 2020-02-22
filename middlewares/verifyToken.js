const configs = require('configs/index');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, InvalidTokenError, TokenExpiredError } = require('common/error');

const { TokenExpiredError: JWTExpiredError } = jwt;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const splitedHeader = bearerHeader.split(' ');
    const token = splitedHeader[1];
    jwt.verify(token, configs.JWT_SECRET_KEY, (err, result) => {
      if (err) {
        if (err instanceof JWTExpiredError) {
          throw new TokenExpiredError();
        }
        throw new InvalidTokenError();
      }
      req.uid = result.uid;
      next();
    });
  } else {
    throw new UnauthorizedError();
  }
}

module.exports = verifyToken;
