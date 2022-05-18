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
  checkForValidation,
} = require("../middleware/category");

// Routes
categoryRouter.get("/category", getCategories);

categoryRouter.post(
  "/category",
  categoryValidateRules,
  checkForValidation,
  asyncHandler(postCategory)
);

categoryRouter.put(
  "/category/:cuid",
  categoryValidateRules,
  checkForValidation,
  asyncHandler(updateCategory)
);

categoryRouter.delete("/category/:cuid", asyncHandler(deleteCategory));

module.exports = categoryRouter;
