const configs = require('configs/index');
const asyncRoute = require('utils/asyncRoute');
const User = require('db/models/User');
const constant = require('common/constant');
const {
  UserNotFoundError,
  TakenUsernameError,
  TakenEmailError,
  InvalidEmailFormatError,
} = require('common/error');
const { VerifyUserEmail } = require('common/mail');
const validation = require('utils/validation');
const encryption = require('utils/encryption');
const jsonWebToken = require('utils/jsonWebToken');

const { UserAction, SelectField } = constant;

const getUserById = asyncRoute(async (req, res) => {
  const data = await User.findOne(
    { _id: req.uid },
    { password_hashed: SelectField.NO }
  );
  if (!data) throw new UserNotFoundError();
  res.json({ data });
});

const createNewUser = asyncRoute(async (req, res) => {
  const {
    username, email, password, full_name, phone_number,
  } = req.body;
  const exUserWithUsername = await User.findOne({ username });
  if (exUserWithUsername) throw new TakenUsernameError();
  const exUserWithEMail = await User.findOne({ email });
  if (exUserWithEMail) throw new TakenEmailError();
  if (!validation.isValidEmail(email)) throw new InvalidEmailFormatError();

  const [newUser] = await User.create([{
    username,
    password_hashed: encryption.encrypt(password),
    email,
    email_verified: false,
    phone_number,
    full_name,
    account_type: 'normal'
  }]);
  const verifyLink = `${configs.FE_URL}/verify?userId=${newUser.id}`;
  const verifyEmail = new VerifyUserEmail({
    to: `${newUser.email}`,
    html: `Xin chào ${newUser.full_name}, <br/>
    Bạn vừa mới đăng ký tạo tài khoản mới trên Easy-Event <br/>
    Chúng tôi cần bạn xác nhận email đăng ký, vui lòng ấn vào đường dẫn sau để hoàn tất: <br/>
    <a href="${verifyLink}">${verifyLink}</a><br/>
    Chúc bạn có những trải nghiệm tuyệt với cùng Easy-Event`
  });

  verifyEmail.send();

  res.json({
    data: {
      userId: newUser.id,
      token: jsonWebToken.signToken({ uid: newUser.id })
    },
  });
});

const updateUser = asyncRoute(async (req, res) => {
  const { action } = req.body;
  const { userId } = req.params;
  let updatedUser;
  if (action === UserAction.VERIFY) {
    updatedUser = await User.findByIdAndUpdate(userId, { email_verified: true }, { new: true });
  }
  return res.json({ data: { updatedUser } });
});

module.exports = {
  getUserById,
  createNewUser,
  updateUser,
};
