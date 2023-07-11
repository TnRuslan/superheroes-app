const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const HttpError = require("../helpers");
require("dotenv").config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    const files = req.files;
    const uploadedImages = [];

    for (const file of files) {
      const { path: filePath } = file;

      const result = await cloudinary.uploader.upload(filePath);
      uploadedImages.push(result.secure_url);

      fs.unlink(filePath);
    }

    req.body.images = uploadedImages;

    next();
  } catch (error) {
    HttpError(500, "Failed to upload photos");
  }
};

module.exports = cloudinaryUpload;
