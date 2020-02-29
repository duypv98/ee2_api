const asyncRoute = require('utils/asyncRoute');
const staffCore = require('core/staffs.core');

const getStaffsByEventId = (asyncRoute(async (req, res) => {
  const dataResponse = await staffCore.findStaffsByEventId(req.params.eventId);
  res.json({
    data: dataResponse,
  });
}));

const addStaffToEvent = asyncRoute(async (req, res) => {
  const dataResponse = await staffCore.addStaffToEvent(req.params.eventId, req.body.email);
  res.json({
    data: dataResponse,
  });
});

const deleteStaffFromEvent = asyncRoute(async (req, res) => {
  const dataResponse = await staffCore.removeStaffFromEvent(req.params.eventId, req.params.staffId);
  res.json({
    data: dataResponse,
  });
});

module.exports = {
  getStaffsByEventId,
  addStaffToEvent,
  deleteStaffFromEvent,
};
