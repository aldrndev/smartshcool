const mongoose = require('mongoose');
const { Schema } = mongoose;

const GradeSchema = new Schema({
  educationLevel: {
    type: String,
    enum: ['SD', 'SMP', 'SMA'],
    required: [true, 'Education level is required'],
  },
  gradeLevel: {
    type: String,
    required: [true, 'Grade is required'],
  },
  gradeType: String,
});

const Grade = mongoose.model('Grade', GradeSchema);

module.exports = Grade;
