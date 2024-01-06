const express = require('express');
const Auth = require('../../controllers/studentController/auth');
const parser = require('../../config/cloudinary');
const { authenticateStudent } = require('../../middlewares/authenticate');
const Student = require('../../controllers/studentController/student');
const {
  changeStatusMessageAuthorize,
  deleteMessageAuthorize,
} = require('../../middlewares/authorize');
const router = express.Router();

router.post('/login', Auth.login);
router.post('/register', parser.single('profileImg'), Auth.register);

router.use(authenticateStudent);
router.get('/course/', Student.fetchCourseByGrade);
router.get('/profile', Student.fethProfile);
router.get('/message', Student.fetchMessage);
router.get('/assignment', Student.fetchAssignment);

router.patch('/course/:courseId', Student.addEnrolledCourse);
router.patch('/assigment/:assignmentId', Student.addSubmittedAssignment);
router.patch(
  '/message/:id',
  changeStatusMessageAuthorize,
  Student.changeStatusMessage
);

router.delete('/message/:id', deleteMessageAuthorize, Student.deleteMessage);

module.exports = router;
