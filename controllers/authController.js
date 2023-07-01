const {
  HttpError,
  cntrlWrapper,
  validatePassword,
  createToken,
} = require("../helpers");
const {
  createNewUser,
  findUserByEmail,
  findUserByIdAndUpdate,
} = require("../services/userDbServices");

const registration = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    throw HttpError(409, "Email already use");
  }

  const newUser = await createNewUser(email, password, name);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(401, "User with this email not found");
  }

  await validatePassword(password, user.password);

  const token = await createToken({
    id: user._id,
  });

  res.status(200).json({
    token,
    user: {
      email,
      name: user.name,
    },
  });
};

const logOut = async (req, res) => {
  const { _id: id } = req.user;
  await findUserByIdAndUpdate(id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const getCurrentUser = async (req, res) => {
  const { email, name } = req.user;
  res.json({
    currentUser: {
      name,
      email,
    },
  });
};

module.exports = {
  registration: cntrlWrapper(registration),
  logIn: cntrlWrapper(logIn),
  logOut: cntrlWrapper(logOut),
  getCurrentUser: cntrlWrapper(getCurrentUser),
};
