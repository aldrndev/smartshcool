const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  questionTitle: {
    type: String,
    required: [true, 'Question title is required'],
  },
  options: [
    {
      type: String,
      required: [true, 'Options are required'],
    },
  ],
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
  },
});

const AnswerSchema = new Schema({
  questionId: {
    type: String,
    required: [true, 'Question id is required'],
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
  },
  isCorrect: Boolean,
});

const SubmissionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
  answers: [AnswerSchema],
  score: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const AssignmentSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: String,
  dueDate: Date,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: 'Grade',
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  questions: [QuestionSchema],
  submissions: [SubmissionSchema],
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;
