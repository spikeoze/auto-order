const { join } = require("@prisma/client/runtime");
const joi = require("joi");

const productsValidateRules = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
  price: joi.number().positive().min(1).greater(0).required(),
  category: joi.string().min(1).max(50).required(),
});

const categoryValidateRules = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
  subCategory: joi.string().min(1).max(50),
});

const schemaValidatorMiddlewere = (schemaValidator) => {
  return (req, res, next) => {
    const { error } = schemaValidator.validate(req.body);
    const valid = error == null; // false
    if (!valid) {
      res.status(422).json({
        message: `invalid request,${error.details.map((i) => i.message)} `, // mapping over the errors to get the messages only
        data: req.body,
      });
    } else {
      next();
    }
  };
};

module.exports = {
  productsValidateRules,
  categoryValidateRules,
  schemaValidatorMiddlewere,
};
