import cloudinary from "../lib/cloudinary.js";
import Category from "../model/Category.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createCategory = async (req, res) => {
  try {
    const { image, name } = req.body;

    // Check if name is provided

    if (!name || !image) {
      return res.status(400).json({ message: "Please add all field" });
    }
    let category;
    let result;

    // Handle image upload if provided
    if (image) {
      try {
        result = await cloudinary.uploader.upload(image);
        category = new Category({
          image: result.secure_url,
          name: name,
        });
      } catch (error) {
        return res.status(400).json({ message: "Image cannot be uploaded" });
      }
    } else {
      category = new Category({
        name: name,
      });
    }

    // Save the category
    await category.save();

    // Send success response
    return res.status(201).json({
      category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const postId = req.params.id;

    const category = await Category.findById(postId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (category.image) {
      await cloudinary.uploader.destroy(
        category.image.split("/").pop().split(".")[0]
      );
    }
    await Category.findByIdAndDelete(postId);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const allfieldAllowed = ["name", "image"];
    const updateData = {};
    for (const field of allfieldAllowed) {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    }
    if (req.body.image) {
      // Ensure field names match
      try {
        const result = await cloudinary.uploader.upload(req.body.image);
        updateData.image = result.secure_url;
      } catch (error) {
        res.status(400).json({ message: "image can not be uploaded" });
      }
    }

    await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runvalidators: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
