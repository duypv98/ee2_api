const asyncRoute = require('utils/asyncRoute');
const eventCore = require('core/events.core');

const getEventsByUserId = asyncRoute(async (req, res) => {
  const dataResponse = await eventCore.findEventsByUser(req.uid, req.query.p);
  res.json({
    data: dataResponse,
  });
});

const getEventInfo = asyncRoute(async (req, res) => {
  const dataResponse = await eventCore.findEventDetails(req.params.eventId);
  res.json({
    data: dataResponse,
  });
});

const getAllEvents = asyncRoute(async (req, res) => {
  const dataResponse = await eventCore.findAllEvents(req.query.p);
  res.json({
    data: dataResponse,
  });
});

const getAllCategories = asyncRoute(async (req, res) => {
  const dataResponse = await eventCore.findAllCategories();
  res.json({
    data: dataResponse,
  });
});

const createEvent = asyncRoute(async (req, res) => {
  const dataResponse = await eventCore.saveNewEvent(req.uid, req.body);
  res.json({
    data: dataResponse,
  });
});

module.exports = {
  getEventsByUserId,
  getEventInfo,
  getAllEvents,
  getAllCategories,
  createEvent,
};
