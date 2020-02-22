const asyncDec = require('utils/asyncDecoration');
const authCore = require('core/auth.core');

const login = asyncDec(async (req, res) => {
  const { username, password } = req.body;
  const dataResponse = await authCore.checkLogin(username, password);
  res.json({
    data: dataResponse,
  });
});

module.exports = { login };
