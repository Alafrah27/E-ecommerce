import express from "express";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../Controller/Payments.controller.js";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";

const router = express.Router();

router.post("/create-checkout-session", protectAuth, createCheckoutSession);
router.post("/checkout-success", protectAuth, checkoutSuccess);

export default router;
