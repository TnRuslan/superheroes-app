const Joi = require("joi");

const heroSchema = Joi.object({
  nikname: Joi.string().required(),
  name: Joi.string().required(),
  origin: Joi.string().required(),
  superPowers: Joi.string().required(),
  catchPhrase: Joi.string().required(),
  images: Joi.string(),
})
  .required()
  .max(6);

const updateSchema = Joi.object({
  nikname: Joi.string(),
  name: Joi.string(),
  origin: Joi.string(),
  superPowers: Joi.string(),
  catchPhrase: Joi.string(),
  images: Joi.string(),
}).max(6);

module.exports = {
  heroSchema,
  updateSchema,
};
