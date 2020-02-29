module.exports = (fn) => {
  const wrapper = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return wrapper;
};
