const { Router } = require('express');
const eventController = require('controllers/events.controller');
const guestController = require('controllers/guests.controller');
const staffController = require('controllers/staffs.controller');
const verifyToken = require('middlewares/verifyToken');

const router = Router();

router.route('/')
  .get(eventController.getAllEvents)
  .post(verifyToken, eventController.createEvent);

router.route('/:eventId')
  .get(eventController.getEventInfo);

router.route('/:eventId/guests')
  .get(verifyToken, guestController.getGuestsByEventId)
  .post(guestController.createGuest);

router.route('/:eventId/staffs')
  .get(verifyToken, staffController.getStaffsByEventId)
  .post(verifyToken, staffController.addStaffToEvent);

router.route('/:eventId/staffs/:staffId')
  .delete(verifyToken, staffController.deleteStaffFromEvent);

router.route('/:eventId/guests/:guestId')
  .get(verifyToken, guestController.getGuestInfo)
  .put(verifyToken, guestController.updateGuest);

router.route('/categories')
  .get(eventController.getAllCategories);

module.exports = router;
