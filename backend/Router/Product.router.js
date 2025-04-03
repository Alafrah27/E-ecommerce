import express from "express";
import {
  CreateProducts,
  deleteProduct,
  fraturedProduct,
  getProduct,
  getProducts,
  relatedProduct,
  toggleFratured,
  updateProduct,
} from "../Controller/Product.controller.js";
import { adminAuth, protectAuth } from "../MiddleWare/ProtectAuth.js";

const router = express();

router.get("/all", getProducts);
router.get("/featured", fraturedProduct);
router.get("/:id", getProduct);
router.get("/releated/:id", relatedProduct);
router.put("/:id", protectAuth, adminAuth, updateProduct);
router.patch("/featured/:id", protectAuth, adminAuth, toggleFratured);
router.delete("/delete/:id", protectAuth, adminAuth, deleteProduct);
router.post("/create", protectAuth, adminAuth, CreateProducts);

export default router;
