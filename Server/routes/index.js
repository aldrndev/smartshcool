const express = require('express');
const router = express.Router();
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/student', studentRoutes);
router.use('/teacher', teacherRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
