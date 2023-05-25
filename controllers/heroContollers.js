const { cntrlWrapper, HttpError } = require("../helpers");
const { Hero } = require("../models/superheroModel");

const getAll = async (req, res) => {
  const { page = 0 } = req.query;
  const limit = 5;
  const result = await Hero.find({})
    .select({ nikname: 1, images: 1, name: 1 })
    .skip(page * limit)
    .limit(limit);
  res.json({ result, limit, page });
};

const getHeroById = async (req, res) => {
  const { heroId: _id } = req.params;
  const result = await Hero.findById(_id).select({ __v: 0 });
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ result });
};

const addHero = async (req, res) => {
  const newHero = await Hero.create({ ...req.body });
  res.status(201).json(newHero);
};

const updateHero = async (req, res) => {
  const { heroId: _id } = req.params;
  const result = await Hero.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  ).select({ __v: 0 });

  if (!result) {
    throw HttpError(404, "Hero not found");
  }

  res.json(result);
};

const deleteHero = async (req, res) => {
  const { heroId: _id } = req.params;

  const result = await Hero.findByIdAndRemove(_id);

  if (!result) {
    throw HttpError(404, "Hero not found");
  }

  res.json({ message: "hero deleted" });
};

const uploadPhoto = async (req, res) => {
  console.log("file", req);

  res.json({ message: "uploaded", result: req.file.path });
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  addHero: cntrlWrapper(addHero),
  getHeroById: cntrlWrapper(getHeroById),
  updateHero: cntrlWrapper(updateHero),
  deleteHero: cntrlWrapper(deleteHero),
  uploadPhoto: cntrlWrapper(uploadPhoto),
};
