import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../Controller/Category.controller.js";

const router = express.Router();

router.get("/all", getAllCategory);
router.post("/create", createCategory);
router.delete("/:id", deleteCategory);
router.put("/update-category/:id", updateCategory);

export default router;
