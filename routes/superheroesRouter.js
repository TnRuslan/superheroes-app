const express = require("express");
const {
  getAll,
  getHeroById,
  updateHero,
  deleteHero,
  uploadPhoto,
  createHero,
} = require("../controllers/heroContollers");
const {
  uploadCloud,
  validateBody,
  upload,
  cloudinaryUpload,
} = require("../middlewares");
const { heroSchema, updateSchema } = require("../schemas/heroSchema");
const { isValidId, authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/", getAll);

router.get("/:heroId", isValidId, getHeroById);

// router.post("/", authMiddleware, validateBody(heroSchema), createHero);

router.post(
  "/",
  authMiddleware,
  validateBody(heroSchema),
  upload.array("images", 5),
  cloudinaryUpload,
  createHero
);

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

// {
//     "nikname": "New Super",
//     "name": "Simons",
//     "origin": "from Poltava",
//     "superPowers": "Eat many food",
//     "catchPhrase": "meow meow meow",
//     "images": "https://res.cloudinary.com/dzuo4vvii/image/upload/v1685230144/hero-photos/wzrfjxgcamslubwht2jo.jpg"
// }
