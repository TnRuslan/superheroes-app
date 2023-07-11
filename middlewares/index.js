const uploadCloud = require("./uploadMiddleware");
const validateBody = require("./validationMiddleware");
const authMiddleware = require("./authMiddlewar");
const isValidId = require("./isValidId");
const upload = require("./upload");
const cloudinaryUpload = require("./cloudinaryUpload");

module.exports = {
  uploadCloud,
  validateBody,
  authMiddleware,
  isValidId,
  upload,
  cloudinaryUpload,
};
