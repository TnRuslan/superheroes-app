const { Hero } = require("../models/superheroModel");

const findAll = async (page, limit) => {
  const result = await Hero.find({})
    .select({ nikname: 1, images: 1, name: 1 })
    .skip(page * limit)
    .limit(limit);

  const totalCount = await Hero.find({}).count();

  return { result, totalCount };
};

const findById = async (id) => {
  const result = await Hero.findById(id).select({ __v: 0 });
  return result;
};

const createHeroDb = async (heroParams) => {
  const newHero = await Hero.create({ ...heroParams });
  return newHero;
};

const updateHeroDb = async (id, newParams) => {
  const updatedHero = await Hero.findByIdAndUpdate(
    id,
    { ...newParams },
    { new: true }
  ).select({ __v: 0 });

  return updatedHero;
};

const removeHeroFromDb = async (id) => {
  const result = await Hero.findByIdAndRemove(id);
  return result;
};

module.exports = {
  findAll,
  findById,
  createHeroDb,
  updateHeroDb,
  removeHeroFromDb,
};
