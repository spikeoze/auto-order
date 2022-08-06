const express = require("express");
const categoryRouter = express.Router();
const asyncHandler = require("express-async-handler");
// Controller Functions
const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

// middleware
const {
  categoryValidateRules,
  schemaValidatorMiddlewere,
} = require("../middleware/validateschemas");
// Routes
categoryRouter.get("/category", getCategories);

categoryRouter.post(
  "/category",
  schemaValidatorMiddlewere(categoryValidateRules),
  asyncHandler(postCategory)
);

categoryRouter.put(
  "/category/:cuid",
  schemaValidatorMiddlewere(categoryValidateRules),
  asyncHandler(updateCategory)
);

categoryRouter.delete("/category/:cuid", asyncHandler(deleteCategory));

module.exports = categoryRouter;
