const bcrypt = require("bcrypt");
require("dotenv").config();

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

module.exports = hashPassword;
