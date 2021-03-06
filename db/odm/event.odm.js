/* eslint-disable no-unused-vars */
const constant = require('common/constant');
const Category = require('db/models/Category');
const Event = require('db/models/Event');
const Group = require('db/models/Group');
const { Schema } = require('mongoose');
const { EventNotFoundError } = require('common/error');

const { SelectField, ProjectedField } = constant;

/**
 *
 * @param {String} userId
 */
async function findByUserId(userId, offset, limit) {
  const listEvents = await Group.find(
    { users: userId },
    { _id: SelectField.NO }, // This is Group'id, that will not be returned.
  ).populate('event', ProjectedField.EVENTS_LIST, 'Event', null, { sort: { start_time: -1 } }).skip(offset).limit(limit);
  return listEvents;
}

/**
 *
 * @param {String} userId
 */
async function countByUserId(userId) {
  const totalEvents = await Group.countDocuments({ users: userId });
  return totalEvents;
}

/**
 * Get all public events
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Array<Object>} list all public events
 */
async function findAll(offset, limit) {
  const listEvents = await Event.find(
    {},
    { contact: SelectField.NO, location: SelectField.NO, description: SelectField.NO },
  ).populate('category')
    .skip(offset)
    .limit(limit)
    .sort({ start_time: -1 });
  return listEvents;
}

/**
 * Count all public events for pagination
 * @returns {Number} total events
 */
async function countAll() {
  const totalEvents = await Event.countDocuments();
  return totalEvents;
}

/**
 * Find an event that matches given ID
 * @param {String} id
 * @returns {Object} event
 */
async function findById(id) {
  const event = await Event.findOne(
    { _id: id },
  ).populate('category', ProjectedField.CATEGORY_DETAIL);
  return event;
}

async function save(event) {
  const newEvent = new Event(event);
  const savedEvent = await newEvent.save();
  return savedEvent;
}

async function update(eventId, updates) {
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    updates,
    { new: true },
  );
  return updatedEvent;
}

module.exports = {
  findByUserId,
  countByUserId,
  findAll,
  countAll,
  findById,
  save,
  update,
};
