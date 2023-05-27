const express = require("express");
const {
  getAll,
  getHeroById,
  updateHero,
  deleteHero,
  uploadPhoto,
  createHero,
} = require("../controllers/heroContollers");
const { uploadCloud, validationMiddleware } = require("../middlewares");
const { heroSchema, updateSchema } = require("../schemas/heroSchema");

const router = express.Router();

router.get("/", getAll);

router.get("/:heroId", getHeroById);

router.post("/", validationMiddleware(heroSchema), createHero);

router.patch("/:heroId", validationMiddleware(updateSchema), updateHero);

router.delete("/:heroId", deleteHero);

router.post("/photo", uploadCloud.single("image"), uploadPhoto);

module.exports = {
  heroRouter: router,
};
