const mongoose = require('mongoose');
const { hashPwd } = require('../utils/bcrypt');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (value) => {
        return /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(value);
      },
      message:
        'Password must contain at least one capital letter, one number, and be at least 5 characters long',
    },
  },
  profileImg: String,
  coursesTaught: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

TeacherSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hashPwd(this.password);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
