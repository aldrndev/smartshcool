const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchoolSchema = new Schema({
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
});

AdminSchoolSchema.pre('save', async function (next) {
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

const AdminSchool = mongoose.model('AdminSchool', AdminSchoolSchema);

module.exports = AdminSchool;
