const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { findUserById } = require("../services/userDbServices");
require("dotenv").config();

const tokenType = "Bearer";

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== tokenType) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(id);

    if (!user || !user.token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authMiddleware;
