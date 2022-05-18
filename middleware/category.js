const { body, validationResult } = require("express-validator");

const categoryValidateRules = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("name must be at least 1 character"),
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
  categoryValidateRules,
  checkForValidation,
};
