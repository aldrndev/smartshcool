const express = require('express');
const Grade = require('../../controllers/teacherController/grade');
const router = express.Router();
const Assignment = require('../../controllers/teacherController/assignment');
const Auth = require('../../controllers/teacherController/auth');
const Course = require('../../controllers/teacherController/course');
const Message = require('../../controllers/teacherController/message');
const {
  changeStatusMessageAuthorize,
  deleteMessageAuthorize,
} = require('../../middlewares/authorize');
const { authenticateTeacher } = require('../../middlewares/authenticate');

//auth
router.post('/login', Auth.login);
router.post('/register', Auth.register);

router.use(authenticateTeacher);
//grade
router.get('/grade', Grade.fetchGrade);
router.post('/grade', Grade.addGrade);
router.put('/grade/:id', Grade.updateGrade);
router.delete('/grade/:id', Grade.deleteGrade);

//asignment
router.get('/assignment', Assignment.fetchAssignmentByTeacher);
router.post('/assignment', Assignment.addAssignment);
router.put('/assignment', Assignment.updateAssignment);
router.delete('/assignment', Assignment.deleteAssignment);

//course
router.get('/course', Course.fetchCoursesByTeacher);
router.post('/course', Course.addCourse);
router.put('/course/:id', Course.updateCourse);
router.delete('/course/:id', Course.deleteCourse);

//message
router.get('/message', Message.fetchMessage);
router.patch(
  '/message/:id',
  changeStatusMessageAuthorize,
  Message.changeStatusMessage
);
router.patch('/message/:id', deleteMessageAuthorize, Message.deleteMessage);

module.exports = router;
