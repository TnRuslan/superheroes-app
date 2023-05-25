const Joi = require("joi");

const heroSchema = Joi.object({
  nikname: Joi.string().required(),
  name: Joi.string().required(),
  origin: Joi.string(),
  catch_phrase: Joi.string(),
  images: Joi.string(),
})
  .required()
  .max(5);

module.exports = heroSchema;
