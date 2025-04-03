import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
} from "../Controller/Comment.controller.js";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";

const router = express.Router();
router.get("/:id", getComment);
router.post("/:id", protectAuth, createComment);
router.delete("/:id", protectAuth, deleteComment);

export default router;
