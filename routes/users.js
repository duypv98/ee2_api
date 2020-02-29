const { Router } = require('express');
const verifyToken = require('middlewares/verifyToken');
const verifyUser = require('middlewares/verifyUser');
const userController = require('controllers/users.controller');
const eventController = require('controllers/events.controller');

const router = Router();

router.route('/users')
  .post(userController.createNewUser);

router.route('/users/:userId')
  .get(verifyToken, verifyUser, userController.getUserById)
  .put(userController.updateUser);

router.route('/users/:userId/events')
  .get(verifyToken, verifyUser, eventController.getEventsByUserId);

module.exports = router;
