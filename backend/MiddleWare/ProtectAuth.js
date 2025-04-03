import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.model.js";

dotenv.config();
export const protectAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: " You are Not authorized" });
    }
    try {
      let decoded;
      decoded = jwt.verify(token, process.env.JWT_SECRECT);
      if (!decoded) {
        return res.status(401).json({ message: " You are Not authorized" });
      }

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: " You are Not authorized" });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(500).json({ message: "token error " });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error " });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin === true && req.user.isVerify === true) {
      next();
    } else {
      return res.status(401).json({ message: " Your not a admin memeber" });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error " });
  }
};

export const AvoidDeleteAdmin = async (req, res, next) => {
  try {
    const adminToDelete = await User.findById(req.params.id);

    if (!adminToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    if (adminToDelete.isAdmin === true) {
      return res.status(400).json({ message: "You cannot delete an admin" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
