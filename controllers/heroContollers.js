const { cntrlWrapper, HttpError } = require("../helpers");
const {
  findAll,
  findById,
  createHeroDb,
  updateHeroDb,
  removeHeroFromDb,
} = require("../services/heroDbServices");

const getAll = async (req, res) => {
  const { page = 0 } = req.query;
  const limit = 5;
  const { result, totalCount } = await findAll(page, limit);
  res.json({ result, limit, page, totalCount });
};

const getHeroById = async (req, res) => {
  const { heroId: _id } = req.params;
  const result = await findById(_id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ result });
};

const createHero = async (req, res) => {
  const newHero = await createHeroDb(req.body);
  res.status(201).json(newHero);
};

const updateHero = async (req, res) => {
  const { heroId: _id } = req.params;
  const newParams = req.body;

  const result = await updateHeroDb(_id, newParams);

  if (!result) {
    throw HttpError(404, "Hero not found");
  }

  res.json(result);
};

const deleteHero = async (req, res) => {
  const { heroId: _id } = req.params;

  const result = await removeHeroFromDb(_id);

  if (!result) {
    throw HttpError(404, "Hero not found");
  }

  res.json({ message: "hero deleted" });
};

const uploadPhoto = async (req, res) => {
  res.json({ message: "uploaded", result: req.file.path });
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getHeroById: cntrlWrapper(getHeroById),
  updateHero: cntrlWrapper(updateHero),
  deleteHero: cntrlWrapper(deleteHero),
  uploadPhoto: cntrlWrapper(uploadPhoto),
  createHero: cntrlWrapper(createHero),
};
