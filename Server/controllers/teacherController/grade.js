const Grade = require('../../models/grade');
const Student = require('../../models/student');

module.exports = {
  addGrade: async (req, res, next) => {
    try {
      const { educationLevel, gradeLevel, gradeType } = req.body;

      const createGrade = await Grade.create({
        educationLevel,
        gradeLevel,
        gradeType,
      });

      res.status(201).json({
        message: `Success created grade`,
        data: createGrade,
      });
    } catch (error) {
      next(error);
    }
  },

  fetchGrade: async (req, res, next) => {
    try {
      const getData = await Grade.find();

      if (getData.length === 0) {
        return res.status(200).json({
          message: 'No grade available in database',
        });
      }

      res.status(200).json({
        message: 'Success fetch grade',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteGrade: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteGrade = await Grade.deleteOne({ _id: id });

      if (deleteGrade.deletedCount === 0) {
        return res.status(404).json({ message: 'Grade not found in database' });
      }

      res.status(200).json({
        message: 'Deleted grade successfully',
        data: deleteGrade,
      });
    } catch (error) {
      next(error);
    }
  },

  updateGrade: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { educationLevel, gradeLevel, gradeType } = req.body;

      const updated = await Grade.findByIdAndUpdate(
        id,
        { educationLevel, gradeLevel, gradeType },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updated) {
        return next(new Error('grade_not_found'));
      }

      res.status(200).json({
        message: 'Success update grade',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },
};
