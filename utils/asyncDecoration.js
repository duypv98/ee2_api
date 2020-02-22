/**
 *
 * @param {Function} fn
 */
function wrapAsync(fn) {
  const wrapper = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return wrapper;
}

module.exports = wrapAsync;
