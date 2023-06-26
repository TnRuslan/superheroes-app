const express = require("express");
const {
  registration,
  logIn,
  logOut,
  getCurrentUser,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.post("/registration", registration);

router.post("/logIn", logIn);

router.post("/logOut", authMiddleware, logOut);

router.get("/current", authMiddleware, getCurrentUser);

module.exports = {
  authRouter: router,
};
