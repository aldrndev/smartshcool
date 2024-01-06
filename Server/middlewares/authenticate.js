const Student = require('../models/student');
const Teacher = require('../models/teacher');
const { verifyToken } = require('../utils/jwt');

const authenticateStudent = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error('unauthorized');
    }

    const decode = verifyToken(access_token);

    const checkStudent = await Student.findById(decode.id);

    if (!checkStudent) {
      throw new Error('unauthorized');
    }

    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateTeacher = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error('unauthorized');
    }

    const decode = verifyToken(access_token);

    const checkStudent = await Teacher.findById(decode.id);

    if (!checkStudent) {
      throw new Error('unauthorized');
    }

    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateStudent,
  authenticateTeacher,
};
