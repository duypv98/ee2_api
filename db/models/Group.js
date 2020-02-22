const { Schema, model } = require('mongoose');

const SchemaTypes = Schema.Types;

const groupSchema = new Schema({
  event: {
    type: SchemaTypes.ObjectId,
    ref: 'Event',
  },
  users: [{
    type: SchemaTypes.ObjectId,
    ref: 'User',
  }],
  name: String,
  role: {
    type: SchemaTypes.ObjectId,
    ref: 'Role',
  },
}, { versionKey: false });

module.exports = model('Group', groupSchema, 'groups');
