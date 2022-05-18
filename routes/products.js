const express = require("express");
const productsRouter = express.Router();
const asyncHandler = require("express-async-handler");

const {
  postProducts,
  getProducts,
  updateProducts,
  deleteProducts
} = require("../controller/products");

const {
  productsValidateRules,
  checkForValidation,
} = require("../middleware/products");

// GET
productsRouter.get("/products", asyncHandler(getProducts));

// POST
productsRouter.post(
  "/products",
  productsValidateRules,
  checkForValidation,
  asyncHandler(postProducts)
);

// PUT
productsRouter.put(
  "/products/:cuid",
  productsValidateRules,
  checkForValidation,
  asyncHandler(updateProducts)
);
// DELETE
productsRouter.delete(
  "/products/:cuid",
  asyncHandler(deleteProducts)
);

module.exports = productsRouter;
