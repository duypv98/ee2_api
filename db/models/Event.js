const { Schema, model } = require('mongoose');

const SchemaTypes = Schema.Types;

const eventSchema = new Schema({
  name: String,
  description: String,
  image_url: String,
  category: [{
    type: SchemaTypes.ObjectId,
    ref: 'Category',
  }],
  contact: {
    phone_number: String,
    email: String,
    facebook: String,
    website: String,
  },
  location: {
    place: String,
    address: String,
    latitude: Number,
    longitude: Number,
  },
  start_time: Date,
  end_time: Date,
});

const Event = model('Event', eventSchema, 'events');
module.exports = Event;
