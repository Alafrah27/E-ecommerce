import cloudinary from "../lib/cloudinary.js";
import User from "../model/User.model.js";

export const getProfile = async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: "faild to get user" });
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const allowedFiled = ["name", "lastname", "email", "password", "image"];
    const updateUser = {};
    for (const field of allowedFiled) {
      if (req.body[field]) {
        updateUser[field] = req.body[field];
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updateData.password = hashedPassword;
    }

    if (req.body.image) {
      try {
        const result = await cloudinary.uploader.upload(req.body.image);
        updateUser.image = result.secure_url;
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
    const updateData = await User.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Account updated sucessfully", updateData });
  } catch (error) {
    return res.status(500).json({ message: "faild to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.image) {
      await cloudinary.uploader.destroy(
        user.image.split("/").pop().split(".")[0]
      );
    }

    const account = await User.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ message: "User faild to delete" });
    }

    return res
      .status(200)
      .json({ message: "User has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
