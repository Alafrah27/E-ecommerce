import express from "express";
import {
  createSize,
  deleteSize,
  getSize,
  updateSize,
} from "../Controller/Size.contrloller.js";
const router = express.Router();
router.get("/all", getSize);
router.get("/:id", deleteSize);
router.put("/:id", updateSize);
router.post("/", createSize);

export default router;
