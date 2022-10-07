const usernameValidator = (username) => {
  username = username.trim();
  let regex = /^[a-zA-Z0-9]+$/;

  if (regex.test(username)) {
    return true;
  }

  return false;
};

module.exports = usernameValidator;
