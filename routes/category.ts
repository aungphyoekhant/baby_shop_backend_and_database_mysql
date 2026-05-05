import express from "express";
import { prisma } from "../libs/prisma.ts";
import { auth } from "../middlewares/auth.ts";

export const router = express.Router();

//Get Caregory List
router.get("/category", async (req, res) => {
  const category = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      items: true,
    },
  });
  return res.status(200).json({ categories: category });
});

//Get Category by Id
router.get("/category/:id", async (req, res) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        items: true,
      },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (e: any) {
    console.error("Error fetching category:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Post Category by Create Category
router.post("/category", auth, async (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ message: "Title, description and image are required" });
  }
  try {
    const category = await prisma.category.create({
      data: {
        title,
        description,
        image,
      },
    });
    res.status(201).json({ category });
  } catch (e: any) {
    console.error("Error creating category:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Post Category by Put Category,

router.put("/category/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  if (!title && !image && !description) {
    return res.status(400).json({ error: "Title, description and image are required" });
  }
  try {
    const category = await prisma.category.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        description: description,
        image: image,
      },
    });

    if (category.count === 0) {
      return res.status(404).json({ msg: "Category not found or you do not have permission to update it" });
    }
    res.json(category);
  } catch (error) {
    console.error("PUT Error:", error);
    res.status(500).json({ error: "Data သိမ်းဆည်း၍ မရပါ" });
  }
});

//Delete Category by Delete Category,
router.delete("/category/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.deleteMany({
      where: {
        id: Number(id),
      },
    });
    if (category.count === 0) {
      return res.status(404).json({ msg: "Category not found or you do not have permission to delete it" });
    }
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({ error: "Data သိမ်းဆည်း၍ မရပါ" });
  }
});
