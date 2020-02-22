const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  key: String,
  value: String,
});

module.exports = model('Category', categorySchema, 'categories');
