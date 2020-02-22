const { Schema, model } = require('mongoose');

const permissionSchema = new Schema({
  data: {
    target: String,
    scope: String,
    action: String,
  },
});

module.exports = model('Permission', permissionSchema, 'permissions');
