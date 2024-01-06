const Assignment = require('../../models/assignment');

module.exports = {
  fetchAssignmentByTeacher: async (req, res, next) => {
    try {
      const { id } = req.user;

      const getData = await Assignment.find({ teacher: id }).populate([
        { path: 'grade' },
        { path: 'course' },
        { path: 'teacher' },
        { path: 'submission', populate: { path: 'student' } },
      ]);

      if (getData.length === 0) {
        return res.status(200).json({
          message: 'No assignment available from your profile',
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

  addAssignment: async (req, res, next) => {
    try {
      const { title, description, dueDate, course, grade, questions } =
        req.body;
      const { id } = req.user;

      const newAssignment = await Assignment.create({
        title,
        description,
        dueDate,
        course,
        grade,
        teacher: id,
        questions,
      });

      res.status(201).json({
        message: 'Success add assignment',
        data: newAssignment,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteAssignment: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedAssignment = await Assignment.findByIdAndDelete(id);

      if (!deletedAssignment) {
        return next(new Error('assignment_not_found'));
      }

      res.status(200).json({
        message: 'Deleted assignment successfully',
        data: deletedAssignment,
      });
    } catch (error) {
      next(error);
    }
  },

  updateAssignment: async (req, res, next) => {
    try {
      const { title, description, dueDate, course, grade, questions } =
        req.body;

      const { id } = req.params;

      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        { title, description, dueDate, course, grade, questions },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedAssignment) {
        return next(new Error('assignment_not_found'));
      }

      res.status(200).json({
        message: 'Success updated assignment',
        data: updatedAssignment,
      });
    } catch (error) {
      next(error);
    }
  },
};
