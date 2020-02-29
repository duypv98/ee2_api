const { Router } = require('express');
const authController = require('controllers/auth.controller');

const router = Router();

router.route('/auth/login')
  .post(authController.login);

module.exports = router;
