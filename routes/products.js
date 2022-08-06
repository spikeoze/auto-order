const express = require("express");
const productsRouter = express.Router();
const asyncHandler = require("express-async-handler");

const {
  postProducts,
  getProducts,
  updateProducts,
  deleteProducts,
} = require("../controller/products");

const {
  productsValidateRules,
  schemaValidatorMiddlewere,
} = require("../middleware/validateschemas");

// GET
productsRouter.get("/products", asyncHandler(getProducts));

// POST
productsRouter.post(
  "/products",
  schemaValidatorMiddlewere(productsValidateRules),
  asyncHandler(postProducts)
);

// PUT
productsRouter.put(
  "/products/:cuid",
  schemaValidatorMiddlewere(productsValidateRules),
  asyncHandler(updateProducts)
);
// DELETE
productsRouter.delete("/products/:cuid", asyncHandler(deleteProducts));

module.exports = productsRouter;
