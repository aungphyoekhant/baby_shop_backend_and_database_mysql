import express from "express";
import { prisma } from "../libs/prisma.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth.ts";
export const router = express.Router();

//Admin Loigin Route,

router.get("/verify", auth, async (req, res) => {
  const id = res.locals.user.id as number;
  const user = await prisma.user.findFirst({
    where: { id },
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

        return res.json({ user, token });
      }
    }
  } catch (e: any) {
    console.error("login error:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});
