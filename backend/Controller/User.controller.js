import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.model.js";
import { MailVerification } from "../lib/Nodemailr.js";
import generateOTP from "../helper/Otpgenerate.js";

export const getAllUsers = async (req, res) => {
  try {
    const query = {};
    let searchobj = req.query.search;

    // Check if searchobj exists and is a string
    if (searchobj && typeof searchobj === "string") {
      query.name = { $regex: searchobj, $options: "i" };
    } else if (searchobj && Array.isArray(searchobj)) {
      // If it's an array, take the first element if it exists and is a string
      if (searchobj.length > 0 && typeof searchobj[0] === "string") {
        query.name = { $regex: searchobj[0], $options: "i" };
      }
      // else ignore it : if the array is empty or doesn't contain string, effectively don't search
    }

    const users = await User.find(query).select("-password");

    if (!users || users.length === 0) {
      //Check if users is empty as well
      return res.status(404).json({
        // Use 404 for "Not Found"
        message: "No users found matching the search criteria",
      });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const registerUser = async (req, res) => {
  const { name, lastname, email, password, location } = req.body;

  try {
    if (!name || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "Password must be at least 6 characters" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { lat, lang } = location;
    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
      location: { lat, lang },

      otpCode: generateOTP(),
    });

    await user.save();

    try {
      await MailVerification(email, name, user.otpCode);
    } catch (error) {
      console.log(error);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(201).json({ message: "User has been created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email not found" });
    }
    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "Password must be at least 6 characters" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Login has been successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, isAdmin: true, isVerify: true });
    if (!user) {
      return res.status(404).json({ message: "Your are not admin member" });
    }
    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "Password must be at least 6 characters" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Login has been successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout has been successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
