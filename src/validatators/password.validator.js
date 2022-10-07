const passwordValidator = (password) => {
  password = password.trim();
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (regex.test(password)) {
    return true;
  }

  return false;
};

module.exports = passwordValidator;
