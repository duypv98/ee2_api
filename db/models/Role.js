const { Schema, model } = require('mongoose');

const SchemaTypes = Schema.Types;

const roleSchema = new Schema({
  permissions: [{
    type: SchemaTypes.ObjectId,
    ref: 'Permission',
  }],
  name: String,
  type: String,
});

module.exports = model('Role', roleSchema, 'roles');
