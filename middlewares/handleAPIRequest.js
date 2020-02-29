const { ServerAPIError } = require('common/error');
const { Error: MongooseError } = require('mongoose');

module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof ServerAPIError) {
      res.status(err.status).json({ error: err });
    } else if (err instanceof MongooseError) {
      res.status(400).json({
        error: {
          code: 40000,
          message: 'Can\'t handle request',
          data: {},
        },
      });
    } else {
      res.status(500).json({
        error: {
          code: 500,
          message: 'Internal Server Error',
          data: {},
        },
      });
    }
  }
  return next(err);
};
