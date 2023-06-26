const jwt = require("jsonwebtoken");
const { findUserByIdAndUpdate } = require("../services/userDbServices");
require("dotenv").config();

const createToken = async (payload) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });

  await findUserByIdAndUpdate(payload.id, { token });

  return token;
};

module.exports = createToken;
