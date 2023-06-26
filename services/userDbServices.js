const { User } = require("../models/userModel");

const createNewUser = async (email, password, name) => {
  const newUser = await User.create({
    email,
    password,
    name,
  });

  return newUser;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

const findUserByIdAndUpdate = async (id, newData) => {
  await User.findByIdAndUpdate(id, { ...newData });
};

module.exports = {
  createNewUser,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdate,
};
