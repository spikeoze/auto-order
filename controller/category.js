const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

// GET
const getCategories = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  const category = await prisma.category.findMany({
    include: { parent: true },
  });
  res.status(200).json(category);
};

// POST
const postCategory = async (req, res) => {
  const { name, subCategory } = req.body;
  console.log(req.body);
  const existingCategory = await prisma.category.findFirst({
    where: { name },
  });
  // if (existingCategory) throw "category already exists";

  const categoryOnly = async () => {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(200).json(category);
  };
  const categoryWithSub = async () => {
    const category = await prisma.category.create({
      data: { name: subCategory, parent_id: existingCategory.id },
    });
    res.status(200).json(category);
  };

  !subCategory ? categoryOnly() : categoryWithSub();
};

// PUT

const updateCategory = async (req, res) => {
  const { cuid } = req.params;
  const { name } = req.body;

  let existingCategory = await prisma.category.findFirst({
    where: { name },
  });
  if (existingCategory) throw "category already exists";

  let category = await prisma.category.findUnique({ where: { cuid } });
  if (!category) throw "this category does not exist";
  category = await prisma.category.update({ where: { cuid }, data: { name } });

  res.status(200).json(category);
};

// DELETE
const deleteCategory = async (req, res) => {
  const { cuid } = req.params;
  let category = await prisma.category.findUnique({ where: { cuid } });
  if (!category) throw "this category does not exist";
  category = await prisma.category.delete({ where: { cuid } });

  res.status(200).json({ category: "deleted" });
};

module.exports = {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
};
