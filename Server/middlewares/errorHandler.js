const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  console.log(error);

  if (error.message === 'grade_not_found') {
    statusCode = 404;
    message = 'Grade not found in database';
  }

  if (error.message === 'forbidden') {
    statusCode = 403;
    message = `You don't have permission to do it`;
  }

  if (error.message === 'message_not_found') {
    statusCode = 404;
    message = 'Message not found in database';
  }

  if (error.message === 'question_not_found') {
    statusCode = 404;
    message = 'Question not found in database';
  }

  if (error.message === 'assignment_not_found') {
    statusCode = 404;
    message = 'Assignment not found in database';
  }

  if (error.message === 'student_not_found') {
    statusCode = 404;
    message = 'Student not found in database';
  }

  if (error.message === 'course_not_found') {
    statusCode = 404;
    message = 'Course not found in database';
  }

  if (error.message === 'unauthorized') {
    statusCode = 401;
    message = `You don't have authorized to access this page`;
  }

  if (error.code === 11000) {
    statusCode = 400;
    message = 'Email already registered, please try again';
  }

  if (error.message === 'file_type_profile') {
    statusCode = 400;
    message = 'Only jpg and png image type is allowed';
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'Upload size for profile image allowed is 2MB';
  }

  if (error.status) {
    statusCode = error.status;
    message = error.message;
  }

  if (
    error.name === 'TokenExpiredError' ||
    error.name === 'JsonWebTokenError'
  ) {
    statusCode = 401;
    message = 'Invalid Token';
  }

  if (error.message === 'invalid_credential') {
    statusCode = 401;
    message = 'Invalid Email/Password, please try again';
  }

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(', ');
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
