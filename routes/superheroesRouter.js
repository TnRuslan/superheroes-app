const express = require("express");
const {
  getAll,
  addHero,
  getHeroById,
  updateHero,
  deleteHero,
  uploadPhoto,
} = require("../controllers/heroContollers");
const { uploadCloud, validationMiddleware } = require("../middlewares");
const heroSchema = require("../schemas/heroSchema");

const router = express.Router();

router.get("/", getAll);

router.get("/:heroId", getHeroById);

router.post("/", validationMiddleware(heroSchema), addHero);

router.patch("/:heroId", updateHero);

router.delete("/:heroId", deleteHero);

router.post("/photo", uploadCloud.single("image"), uploadPhoto);

module.exports = {
  heroRouter: router,
};
