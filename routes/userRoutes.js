const express = require("express");
const {
  registration,
  logIn,
  logOut,
  getCurrentUser,
} = require("../controllers/authController");
const { authMiddleware, validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../schemas/userSchema");

const router = express.Router();

router.post("/registration", validateBody(registerSchema), registration);

router.post("/logIn", validateBody(loginSchema), logIn);

router.post("/logOut", authMiddleware, logOut);

router.get("/current", authMiddleware, getCurrentUser);

module.exports = {
  authRouter: router,
};
