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
const { isValidId, authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/", getAll);

router.get("/:heroId", isValidId, getHeroById);

router.post("/", authMiddleware, validateBody(heroSchema), createHero);

router.patch(
  "/:heroId",
  authMiddleware,
  isValidId,
  validateBody(updateSchema),
  updateHero
);

router.delete("/:heroId", authMiddleware, isValidId, deleteHero);

router.post("/photo", authMiddleware, uploadCloud.single("image"), uploadPhoto);

module.exports = {
  heroRouter: router,
};
