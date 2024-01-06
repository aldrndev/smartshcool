const Assignment = require('../../models/assignment');
const Course = require('../../models/course');
const Message = require('../../models/message');
const Student = require('../../models/student');
const mongoose = require('mongoose');
const socketService = require('../../config/socketService');

module.exports = {
  fetchCourseByGrade: async (req, res, next) => {
    try {
      const { grade } = req.user;

      const fetchCourses = await Course.find({ grade }).populate([
        { path: 'teacher' },
        { path: 'students' },
      ]);

      if (fetchCourses.length === 0) {
        return res.status(200).json({
          message: 'No course available for your grade',
          data: [],
        });
      }

      res.status(200).json({
        message: 'Success fetch courses',
        data: fetchCourses,
      });
    } catch (error) {
      next(error);
    }
  },

  fethProfile: async (req, res, next) => {
    try {
      const { id } = req.user;

      const fetchStudent = await Student.findById(id)
        .populate('grade')
        .populate({
          path: 'enrolledCourses',
          populate: [
            {
              path: 'teacher',
            },
            {
              path: 'grade',
            },
          ],
        })
        .populate({
          path: 'assignmentsSubmitted',
          populate: [
            {
              path: 'course',
            },
            {
              path: 'submissions',
              populate: {
                path: 'student',
              },
            },
          ],
        });

      if (!fetchStudent) {
        return next(new Error('student_not_found'));
      }

      res.status(200).json({
        message: 'Success fetch profile',
        data: fetchStudent,
      });
    } catch (error) {
      next(error);
    }
  },

  addEnrolledCourse: async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { id } = req.user;
      const { courseId } = req.params;

      const checkStudent = await Student.findById(id).session(session);
      const checkCourse = await Course.findById(courseId).session(session);

      if (!checkStudent) {
        return next(new Error('student_not_found'));
      }

      if (!checkCourse) {
        return next(new Error('course_not_found'));
      }

      const addEnrolled = await Student.findByIdAndUpdate(
        id,
        { $addToSet: { enrolledCourses: courseId } },
        { new: true, runValidators: true, session }
      );

      await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { students: id } },
        { new: true, runValidators: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: `Success enrolled course`,
        data: addEnrolled,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  },

  fetchAssignment: async (req, res, next) => {
    try {
      const { grade } = req.user;
      const getData = await Assignment.find({ grade })
        .populate([
          {
            path: 'course',
          },
          { path: 'grade' },
          { path: 'teacher' },
        ])
        .populate({
          path: 'submissions',
          populate: {
            path: 'student',
          },
        });

      if (getData.length === 0) {
        return res.status(200).json({
          message: 'No assigment available for your grade',
          data: [],
        });
      }

      res.status(200).json({
        message: 'Success fetch assignment',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },

  addSubmittedAssignment: async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { id } = req.user;
      const { assignmentId } = req.params;
      const { answers } = req.body;

      const fetchAssignment = await Assignment.findById(assignmentId).session(
        session
      );

      if (!fetchAssignment) {
        return next(new Error('assignment_not_found'));
      }

      let score = 0;
      const answerData = fetchAssignment.questions.map((question) => {
        const submittedAnswer = answers.find(
          (answer) => answer.questionId === question._id.toString()
        );
        const isCorrect =
          submittedAnswer && question.correctAnswer === submittedAnswer.answer;
        if (isCorrect) score += 100;

        return {
          questionId: question._id,
          answer: submittedAnswer ? submittedAnswer.answer : null,
          isCorrect,
        };
      });

      const totalScore = score / fetchAssignment.questions.length;

      const submissionData = {
        student: id,
        answers: answerData,
        score: totalScore,
        submittedAt: new Date(),
      };

      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          $addToSet: { submissions: submissionData },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      await Student.findByIdAndUpdate(
        id,
        {
          $addToSet: { assignmentsSubmitted: assignmentId },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: 'Success take assignment',
        data: submissionData,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  },

  fetchMessage: async (req, res, next) => {
    try {
      const { id } = req.user;

      const receiveMessage = await Message.find({ receiver: id }).populate([
        { path: 'sender' },
        { path: 'receiver' },
      ]);

      const sendMessage = await Message.find({ sender: id }).populate([
        { path: 'sender' },
        { path: 'receiver' },
      ]);

      if (receiveMessage.length === 0 && sendMessage.length === 0) {
        return res.status(200).json({
          message: 'There are no message',
          data: [],
        });
      }

      res.status(200).json({
        message: 'Success fetch message',
        data: { receiveMessage, sendMessage },
      });
    } catch (error) {
      next(error);
    }
  },

  changeStatusMessage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const changeStatus = await Message.findByIdAndUpdate(
        id,
        {
          status: 'Read',
        },
        { new: true, runValidators: true }
      );

      if (!changeStatus) {
        return next(new Error('message_not_found'));
      }

      if (changeStatus.sender.toString() !== req.user.id) {
        socketService.emitToUser(changeStatus.sender, 'messageStatusChanged', {
          messageId: id,
          newStatus: 'Read',
        });
      }
      res.status(200).json({
        message: 'Success change status message',
        data: changeStatus,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteMessage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedMessage = await Message.deleteOne({ _id: id });

      if (deletedMessage.deletedCount === 0) {
        return res.status(404).json({ message: 'Message not found' });
      }

      res.status(200).json({
        message: `Delete message successfully`,
        data: deletedMessage,
      });
    } catch (error) {
      next(error);
    }
  },
};
