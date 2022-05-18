const { body, validationResult } = require("express-validator");

const productsValidateRules = [
  body("name")
    .isLength({ min: 1 })
    .withMessage("name must be at least 1 character"),
  body("price")
    .isLength({ min: 1 })
    .withMessage("price must be at least 1 character"),
  body("category")
    .isLength({ min: 1 })
    .withMessage("category must be filled"),
];

const simpleValidateResults = validationResult.withDefaults({
  formatter: (err) => err.msg,
});

const checkForValidation = (req, res, next) => {
  const errors = simpleValidateResults(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  next();
};


module.exports = {
    productsValidateRules,
    checkForValidation
}