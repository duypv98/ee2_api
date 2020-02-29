const asyncRoute = require('utils/asyncRoute');
const userCore = require('core/users.core');
const constant = require('common/constant');

const { UserAction } = constant;

const getUserById = asyncRoute(async (req, res) => {
  const dataResponse = await userCore.findUserById(req.uid);
  res.json({
    data: dataResponse,
  });
});

const createNewUser = asyncRoute(async (req, res) => {
  const dataResponse = await userCore.saveNewUser(req.body);
  res.json({
    data: dataResponse,
  });
});

const updateUser = asyncRoute(async (req, res) => {
  const { action } = req.body;
  const { userId } = req.params;
  let dataResponse = {};
  if (action === UserAction.VERIFY) {
    dataResponse = await userCore.updateVerifyEmail(userId);
  }
  res.json({
    data: dataResponse,
  });
});

module.exports = {
  getUserById,
  createNewUser,
  updateUser,
};
