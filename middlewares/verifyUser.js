const { UnauthorizedError, PermissionDeniedError } = require('common/error');

module.exports = (req, res, next) => {
  if (!req.uid) {
    throw new UnauthorizedError();
  }
  if (req.params.userId !== 'me' && req.params.userId !== req.uid) {
    throw new PermissionDeniedError();
  }
  next();
};
