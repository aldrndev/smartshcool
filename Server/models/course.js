const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: String,
  materials: [
    {
      type: String,
      required: [true, 'Materials is required'],
    },
  ],
  grade: {
    type: Schema.Types.ObjectId,
    ref: 'Grade',
    required: [true, 'Grade is required'],
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher is required'],
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
