const staffODM = require('db/odm/staff.odm');
const eventODM = require('db/odm/event.odm');
const {
  EventNotFoundError, UserNotFoundError, StaffExistedError, StaffNotFoundError,
} = require('common/error');
const userODM = require('db/odm/user.odm');

async function findStaffsByEventId(eventId) {
  const event = await eventODM.findById(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }
  const listStaffs = await staffODM.findByEventId(eventId);
  return listStaffs;
}

async function addStaffToEvent(eventId, staffEmail) {
  const staff = await userODM.findByEmail(staffEmail);
  if (!staff) {
    throw new UserNotFoundError();
  }
  const exStaff = await staffODM.findByEventAndId(eventId, staff.id);
  if (exStaff) {
    throw new StaffExistedError();
  }
  const updatedGroup = await staffODM.saveToEvent(eventId, staff.id);
  return {
    updatedGroup,
  };
}

async function removeStaffFromEvent(eventId, staffId) {
  const exStaff = await staffODM.findByEventAndId(eventId, staffId);
  if (!exStaff) {
    throw new StaffNotFoundError();
  }
  const updatedGroup = await staffODM.removeFromEvent(eventId, staffId);
  return {
    updatedGroup,
  };
}

module.exports = {
  findStaffsByEventId,
  addStaffToEvent,
  removeStaffFromEvent,
};
