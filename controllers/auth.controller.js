const asyncRoute = require('utils/asyncRoute');
const authCore = require('core/auth.core');

const login = asyncRoute(async (req, res) => {
  const { username, password } = req.body;
  const dataResponse = await authCore.checkLogin(username, password);
  res.json({
    data: dataResponse,
  });
});

module.exports = { login };
