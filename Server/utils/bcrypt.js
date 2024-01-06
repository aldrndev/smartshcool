const bcrypt = require('bcryptjs');

const hashPwd = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const checkPwd = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = {
  hashPwd,
  checkPwd,
};
