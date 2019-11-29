import asyncDec from 'utils/asyncDecorator';
import userCore from 'core/users';

const getUserById = asyncDec(async (req, res) => {
  const dataResponse = await userCore.findUserById(req.params.userId);
  res.json({
    data: dataResponse,
  });
});

export default {
  getUserById,
};
