import express from "express";
import {
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
} from "../Controller/Notifuction.controller.js";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
const router = express.Router();

router.post("/mark-all-as-read/:id", markNotificationAsRead);
router.get("/all", protectAuth, getNotifications);
router.delete("/:id", deleteNotification);

export default router;
