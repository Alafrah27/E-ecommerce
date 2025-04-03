import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  Salseincome,
  updateOrders,
  UserOrders,
} from "../Controller/Order.controller.js";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
const router = express.Router();

router.post("/create", protectAuth, createOrder); // Create an order
router.get("/all", protectAuth, getAllOrders); // Get all orders
router.get("/userOrder", protectAuth, UserOrders); // Get user-specific orders
router.get("/analiyes", protectAuth, Salseincome); // Get sales income
router.delete("/:id", protectAuth, deleteOrder); // Delete an order by ID
router.patch("/status/:id", protectAuth, updateOrders); // Update order status by ID
router.get("/:id", protectAuth, getSingleOrder); // Get a single order by ID

export default router;
