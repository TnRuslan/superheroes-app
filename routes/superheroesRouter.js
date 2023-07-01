const express = require("express");
const {
  getAll,
  getHeroById,
  updateHero,
  deleteHero,
  uploadPhoto,
  createHero,
} = require("../controllers/heroContollers");
const { uploadCloud, validateBody } = require("../middlewares");
const { heroSchema, updateSchema } = require("../schemas/heroSchema");
const { isValidId } = require("../middlewares");

const router = express.Router();

router.get("/", getAll);

router.get("/:heroId", isValidId, getHeroById);

router.post("/", validateBody(heroSchema), createHero);

router.patch("/:heroId", isValidId, validateBody(updateSchema), updateHero);

router.delete("/:heroId", isValidId, deleteHero);

router.post("/photo", uploadCloud.single("image"), uploadPhoto);

module.exports = {
  heroRouter: router,
};
