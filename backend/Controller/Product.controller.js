import cloudinary from "../lib/cloudinary.js";
import Category from "../model/Category.model.js";

import Products from "../model/Product.model.js";

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const searchobj = req.query.search;
    const sortobj = req.query.sort;
    // const categoryQuery = req.query.category.name;

    const query = {};

    if (req.query.category) {
      if (typeof req.query.category === "string") {
        const category = await Category.findOne({ name: req.query.category });
        if (category) {
          query.category = category._id;
        }
      } else if (typeof req.query.category === "object") {
        if (req.query.category.name) {
          const category = await Category.findOne({
            name: req.query.category.name,
          });
          if (category) {
            query.category = category._id;
          }
        } else if (req.query.category._id) {
          query.category = req.query.category._id;
        }
      }
    }

    if (searchobj && typeof searchobj === "string") {
      query.name = { $regex: searchobj, $options: "i" };
    }

    let sortOptions = { createdAt: 1 };

    switch (sortobj) {
      case "asc":
        sortOptions = { price: 1 };
        break;
      case "desc":
        sortOptions = { price: -1 };
        break;

      case "new":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: 1 };
        break;
    }

    const product = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category")
      .sort(sortOptions); // Apply sorting here

    if (!product || product.length === 0) {
      return res.status(400).json({ message: "products not found" });
    }

    const total = await Products.countDocuments(query);
    const hasMore = page * limit < total;

    return res.status(200).json({ product, hasMore, total });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
export const getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Products.findById(productId).populate("category");
    if (!product) {
      return res.status(400).json({ message: "products not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
export const CreateProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      subdescription,
      image,
      price,
      inStock,
      category,
      color,
      size,
      subcategory,
    } = req.body;

    if (!name || !description || !price) {
      return res.status(401).json({ message: "all field are required" });
    }

    const cate = await Category.findOne({
      name: category,
    });
    if (!cate) {
      return res.status(400).json({ message: "category not found" });
    }

    let result;
    if (image) {
      try {
        result = await cloudinary.uploader.upload(image);
      } catch (error) {
        return res.status(400).json({ message: "cloudinary error" });
        console.log(error);
      }
    }

    const product = new Products({
      name,
      description,
      subdescription,
      price,
      image: result.secure_url,
      inStock,
      category: cate._id,
      size,
      subcategory,
      color,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      message: "product has been create successfully ",
      savedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const postId = req.params.id;
    const product = await Products.findById(postId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      await cloudinary.uploader.destroy(
        product.image.split("/").pop().split(".")[0]
      );
    }
    await Products.findByIdAndDelete(postId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "faild to delete product" });
    console.log(error);
  }
};

export const fraturedProduct = async (req, res) => {
  try {
    const product = await Products.find({ isFeature: true });
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const toggleFratured = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    product.isFeature = !product.isFeature;
    const updatedProduct = await product.save();
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "inStock",
      "subdescription",
      "subCategory",
      "color",
      "size",
      "image",
      "category",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    }

    const cate = await Category.findOne({
      name: req.body.category,
    });
    if (cate) {
      updateData.category = cate._id;
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

    const productUpdate = await Products.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!productUpdate) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(productUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const relatedProduct = async (req, res) => {
  try {
    const releted = req.body;
    const releatedProduct = await Products.find({
      name: releated,
    });

    if (!releatedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(releatedProduct);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
