const Course = require('../../models/course');

module.exports = {
  fetchCoursesByTeacher: async (req, res, next) => {
    try {
      const { id } = req.user;
      const getData = await Course.find({ teacher: id }).populate([
        { path: 'grade' },
        { path: 'teacher' },
        { path: 'students' },
      ]);

      if (getData.length === 0) {
        return res.status(200).json({
          message: 'No course upload by your profile',
          data: [],
        });
      }

      res.status(200).json({
        message: 'Success fetch course',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },

  addCourse: async (req, res, next) => {
    try {
      const { title, description, materials, grade } = req.body;
      const { id: teacher } = req.user;

      const createCourse = await Course.create({
        title,
        description,
        materials,
        grade,
        teacher,
      });

      res.status(201).json({
        message: 'Success add course',
        data: createCourse,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteCourse: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedCourse = await Course.findByIdAndDelete(id);

      if (!deletedCourse) {
        return next(new Error('course_not_found'));
      }

      res.status(200).json({
        message: 'Success deleted course',
        data: deletedCourse,
      });
    } catch (error) {
      next(error);
    }
  },

  updateCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, materials, grade } = req.body;

      const updated = await Course.findByIdAndUpdate(
        id,
        {
          title,
          description,
          materials,
          grade,
        },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return next(new Error('course_not_found'));
      }

      res.status(200).json({
        message: 'Success updated course',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },
};
