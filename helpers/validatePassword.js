const HttpError = require("./HttpErrors");
const bcrypt = require("bcrypt");

const WrongPasswordMessage = "Email or password invalid";

const validatePassword = async (password, validPassword) => {
  const passwordCompare = await bcrypt.compare(password, validPassword);

  if (!passwordCompare) {
    throw HttpError(401, WrongPasswordMessage);
  }
};

module.exports = validatePassword;
