const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password_hashed: String,
  email: String,
  email_verified: Boolean,
  phone_number: String,
  full_name: String,
  account_type: String,
}, { versionKey: false });

module.exports = model('User', userSchema, 'users');
