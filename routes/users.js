const { Router } = require('express');
const verifyToken = require('middlewares/verifyToken');
const verifyUser = require('middlewares/verifyUser');
const userController = require('controllers/users.controller');
const eventController = require('controllers/events.controller');

const router = Router();

router.route('/')
  .post(userController.createNewUser);

router.route('/:userId')
  .get(verifyToken, verifyUser, userController.getUserById)
  .put(userController.updateUser);

router.route('/:userId/events')
  .get(verifyToken, verifyUser, eventController.getEventsByUserId);

module.exports = router;
