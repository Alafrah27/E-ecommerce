import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
  loginAdmin,
} from "../Controller/User.controller.js";
import {
  forgetPassword,
  resetPassword,
  userVerify,
} from "../Controller/UserVerify.controll.js";
import {
  deleteUser,
  getProfile,
  updateUser,
} from "../Controller/UserChanges.controller.js";
import {
  adminAuth,
  AvoidDeleteAdmin,
  protectAuth,
} from "../MiddleWare/ProtectAuth.js";
const router = express.Router();
router.get("/all", getAllUsers);
router.get("/profile", protectAuth, getProfile);
router.put("/update/:id", protectAuth, updateUser);
router.delete("/:id", protectAuth, adminAuth, deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", loginAdmin);
router.post("/logout", logoutUser);
router.post("/forgetPassword", forgetPassword);
router.post("/resetpassword/:token", resetPassword);
router.post("/verify", protectAuth, userVerify);

export default router;
