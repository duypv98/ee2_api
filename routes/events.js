const { Router } = require('express');
const eventController = require('controllers/events.controller');
const guestController = require('controllers/guests.controller');
const staffController = require('controllers/staffs.controller');
const verifyToken = require('middlewares/verifyToken');

const router = Router();

router.route('/events')
  .get(eventController.getAllEvents)
  .post(verifyToken, eventController.createEvent);

router.route('/events/:eventId')
  .get(eventController.getEventInfo);

router.route('/events/:eventId/guests')
  .get(verifyToken, guestController.getGuestsByEventId)
  .post(guestController.createGuest);

router.route('/events/:eventId/staffs')
  .get(verifyToken, staffController.getStaffsByEventId)
  .post(verifyToken, staffController.addStaffToEvent);

router.route('/events/:eventId/staffs/:staffId')
  .delete(verifyToken, staffController.deleteStaffFromEvent);

router.route('/events/:eventId/guests/:guestId')
  .get(verifyToken, guestController.getGuestInfo)
  .put(verifyToken, guestController.updateGuest);

router.route('/events/categories')
  .get(eventController.getAllCategories);

module.exports = router;
