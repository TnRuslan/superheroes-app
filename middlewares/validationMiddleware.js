const { HttpError } = require("../helpers");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
};

module.exports = validationMiddleware;
