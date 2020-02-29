const jsonWebToken = require('utils/jsonWebToken');

module.exports = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const verifiedResult = jsonWebToken.verifyBearerToken(bearerHeader);
  req.uid = verifiedResult.uid;
  next();
};
