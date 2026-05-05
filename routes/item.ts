import express from "express";
import { prisma } from "../libs/prisma.ts";
import { auth } from "../middlewares/auth.ts";

export const router = express.Router();

// 1. Get Item List
router.get("/item", async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        category: true, // Category data ပါတစ်ခါတည်း ဆွဲထုတ်မယ်
      },
    });
    // Frontend က items: [] ဆိုပြီး မျှော်လင့်ထားတဲ့အတွက် format ညှိပေးထားပါတယ်
    return res.status(200).json({ items });
  } catch (e) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// 2. Get Item by Id
router.get("/item/:id", async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      // findFirst ထက် findUnique က ပိုမြန်ပါတယ်
      where: {
        id: Number(req.params.id),
      },
      include: {
        category: true,
      },
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// 3. Post Item (Create)
router.post("/item", auth, async (req, res) => {
  const { title, description, image, price, categoryId } = req.body;

  // Validation: Data တွေ အကုန်ပါမပါ စစ်မယ်
  if (!title || !description || !image || !price || !categoryId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const item = await prisma.item.create({
      data: {
        title,
        description,
        image,
        price: String(price), // String ဖြစ်နေရင် Number ပြောင်းပေးရမယ်
        categoryId: Number(categoryId), // Foreign Key ကို Number ဖြစ်အောင် သေချာပြောင်းပါ
      },
    });
    res.status(201).json({ item });
  } catch (e) {
    console.error("Create Item Error:", e);
    res.status(500).json({ message: "Item သိမ်းဆည်းရာတွင် အမှားရှိနေပါသည်" });
  }
});

// 4. Put Item (Update)
router.put("/item/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price, categoryId } = req.body;

  try {
    // updateMany ထက် update ကို သုံးတာ ပိုသေချာပါတယ်
    const updatedItem = await prisma.item.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title || undefined, // data ပါမှ update လုပ်မယ်၊ မပါရင် နဂိုအတိုင်း ထားမယ်
        description: description || undefined,
        image: image || undefined,
        price: price ? String(price) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
      },
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("PUT Error:", error);
    // Item မရှိရင် Prisma က error တက်မှာမို့လို့ 404 စစ်ပေးမယ်
    res.status(500).json({ error: "Data ပြင်ဆင်၍ မရပါ" });
  }
});

// 5. Delete Item
router.delete("/item/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ msg: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({ error: "ဖျက်၍ မရပါ (တခြားနေရာမှာ ချိတ်ဆက်ထားတာ ဖြစ်နိုင်ပါတယ်)" });
  }
});
