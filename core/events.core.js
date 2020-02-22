/* eslint-disable camelcase */
const eventODM = require('db/odm/event.odm');
const roleODM = require('db/odm/role.odm');
const groupODM = require('db/odm/group.odm');
const categoryODM = require('db/odm/category.odm');
const pagination = require('utils/pagination');
const constant = require('common/constant');
const { EventNotFoundError } = require('common/error');
const { Types } = require('mongoose');


const { ItemsPerPage } = constant;

/**
 *
 * Return list of events that associate with an user (pagination)
 * @param {String} userId
 * @param {Number} page
 * @returns {Object} pagination info with list of Events
 */
async function findEventsByUser(userId, page) {
  const totalEvents = await eventODM.countByUserId(userId);
  const paginatedObject = pagination
    .getPaginatedObject(totalEvents, ItemsPerPage.USER_EVENTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listEvents = await eventODM.findByUserId(userId, offset, limit);
  return {
    ...paginationInfo,
    itemsList: listEvents,
  };
}

/**
 *
 * @param {String} eventId
 */
async function findEventDetails(eventId) {
  const event = await eventODM.findById(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }
  return event;
}

/**
 *
 * @param {Number} page
 */
async function findAllEvents(page) {
  const totalEvents = await eventODM.countAll();
  const paginatedObject = pagination
    .getPaginatedObject(totalEvents, ItemsPerPage.ALL_EVENTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listEvents = await eventODM.findAll(offset, limit);
  return {
    ...paginationInfo,
    listItems: listEvents,
  };
}

async function findAllCategories() {
  const listCategories = await categoryODM.findAll();
  return listCategories;
}

async function saveNewEvent(userId, event) {
  const savedEvent = await eventODM.save(event);

  const roleAdmin = await roleODM.findByNameAndType('admin', 'default');
  const roleStaff = await roleODM.findByNameAndType('staff', 'default');

  await groupODM.save({
    event: Types.ObjectId(savedEvent.id),
    users: [userId],
    name: 'admin',
    role: Types.ObjectId(roleAdmin.id),
  });

  await groupODM.save({
    event: Types.ObjectId(savedEvent.id),
    users: [],
    name: 'staff',
    role: Types.ObjectId(roleStaff.id),
  });

  return {
    savedEvent,
  };
}

module.exports = {
  findEventsByUser,
  findEventDetails,
  findAllEvents,
  findAllCategories,
  saveNewEvent,
};
