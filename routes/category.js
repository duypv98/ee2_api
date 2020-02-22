const { Router } = require('express');
const eventController = require('controllers/events.controller');

const router = Router();

router.route('/')
  .get(eventController.getAllCategories);

module.exports = router;
