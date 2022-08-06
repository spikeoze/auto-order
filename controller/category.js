const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

// GET
const getCategories = async (req, res) => {
  const category = await prisma.category.findMany({
    include: { parent: true, sub_category: true },
  });
  res.status(200).json(category);
};

// POST
const postCategory = async (req, res) => {
  const { name, subCategory } = req.body;

  const existingCategory = await prisma.category.findFirst({
    where: { name },
  });

  const categoryOnly = async () => {
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      res
        .status(400)
        .json({ message: "category with the same name already exists" });
    } else {
      const category = await prisma.category.create({
        data: { name },
      });
      res.status(200).json(category);
    }
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

  if (existingCategory) {
    res
      .status(400)
      .json({ message: "category with the same name already exists" });
  }
  let category = await prisma.category.findUnique({ where: { cuid } });
  if (!category) {
    res.status(400).json({ message: "this category does not exist" });
  } else {
    category = await prisma.category.update({
      where: { cuid },
      data: { name },
    });

    res.status(200).json(category);
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  const { cuid } = req.params;
  let category = await prisma.category.findUnique({ where: { cuid } });
  if (!category) {
    res.status(400).json({ message: "this category does not exist" });
  } else {
    category = await prisma.category.delete({ where: { cuid } });
    res.status(200).json({ category: "deleted" });
  }
};

module.exports = {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
};
