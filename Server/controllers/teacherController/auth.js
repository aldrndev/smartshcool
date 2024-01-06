const Teacher = require('../../models/teacher');
const { checkPwd } = require('../../utils/bcrypt');
const { createToken } = require('../../utils/jwt');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new Error('invalid_credential'));
      }

      const checkUser = await Teacher.findOne({ email });

      if (!checkUser) {
        return next(new Error('invalid_credential'));
      }

      if (!checkPwd(password, checkUser.password)) {
        return next(new Error('invalid_credential'));
      }

      const payload = {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        profileImg: checkUser.profileImg,
        coursesTaught: checkUser.coursesTaught,
      };

      const token = createToken(payload);

      res.status(200).json({
        message: `Hello ${checkUser.name}, welcome back`,
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const { name, email, password, grade } = req.body;

      const createTeacher = await Teacher.create({
        name,
        email,
        password,
        profileImg: req.file ? req.file.path : 'https://placekitten.com/200',
      });

      const payload = {
        id: createTeacher._id,
        name: createTeacher.name,
        email: createTeacher.email,
        profileImg: createTeacher.profileImg,
        coursesTaught: checkUser.coursesTaught,
      };

      const token = createToken(payload);

      res.status(201).json({
        message: `Welcome ${createTeacher.name}, your account created successfully`,
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
