const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET request handler
const getProducts = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  const products = await prisma.products
    .findMany({
      orderBy: { createdAt: "asc" },
      include: {
        category: {
          select: {
            name: true,
            parent:true
          },
        },
      },
    })
    .then((products) => {
      products.map((product) => {
        const productImage = product.image_data.toString("base64");
        product["image_data"] = productImage;
      });
      return products;
    });
  res.status(200).json(products);
};

// POST Request handler
const postProducts = async (req, res) => {
  const { name, price, category } = req.body;
  const { image } = req.files;
  // console.log(req.file);

  // Find the id of category
  const getCategory = await prisma.category.findFirst({
    where: { name: category },
  });
  // Check if product exists
  const existingProduct = await prisma.products.findFirst({
    where: { name },
  });
  if (existingProduct) throw "product already exists";

  const product = await prisma.products.create({
    data: {
      name,
      price,
      image_name: image.name,
      image_type: image.mimetype,
      image_data: image.data,
      category: { connect: { id: getCategory.id } },
    },
  });

  res.status(200).json(product);
};

// PUT Request Handler
const updateProducts = async (req, res) => {
  const { name, price, category } = req.body;
  const { cuid } = req.params;

  const getCategory = await prisma.category.findFirst({
    where: { name: category },
  });

  // if product does not exist
  let product = await prisma.products.findUnique({ where: { cuid } });
  if (!product) throw "product not found";
  product = await prisma.products.update({
    where: { cuid },
    data: {
      name,
      price,
      image_name: req.files.image.name,
      image_type: req.files.image.mimetype,
      image_data: req.files.image.data,
      category: { connect: { id: getCategory.id } },
    },
  });

  res.status(200).json(product);
};

// Delete Request handler
const deleteProducts = async (req, res) => {
  const { cuid } = req.params;
  // if product does not exist
  let product = await prisma.products.findUnique({ where: { cuid } });
  if (!product) throw "product not found";
  product = await prisma.products.delete({ where: { cuid } });

  res.status(200).json({ message: "deleted " });
};

module.exports = {
  postProducts,
  getProducts,
  updateProducts,
  deleteProducts,
};
