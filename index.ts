import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded());

import cors from "cors";
app.use(cors());

import { router as itemRouter } from "./routes/item.ts";
import { router as categoryRouter } from "./routes/category.ts";
import { router as userRouter } from "./routes/user.ts";

app.use(categoryRouter);
app.use(itemRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(5500, () => {
  console.log("Server is running on port 5500...");
});
