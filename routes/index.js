const { Router } = require('express');
const authRoutes = require('routes/auth');
const userRoutes = require('routes/users');
const eventRoutes = require('routes/events');
const categoryRoutes = require('routes/category');

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
