import express from "express";
import {
  createColor,
  deleteColor,
  getColor,
  updateColor,
} from "../Controller/Color.controller.js";
import { adminAuth } from "../MiddleWare/ProtectAuth.js";
const router = express.Router();
router.post("/", adminAuth, createColor);
router.get("/all", getColor);
router.delete("/:id", adminAuth, deleteColor);
router.put("/:id", adminAuth, updateColor);

export default router;
