module.exports = (req, res, next) => {
  res.status(404).json({
    error: {
      code: 40400,
      message: 'Not Found',
      data: {},
    },
  });
  next();
};
