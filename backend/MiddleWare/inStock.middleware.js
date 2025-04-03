import Products from "../model/Product.model.js";

export const instackProduct = async (req, res, next) => {
  try {
    let instackProduct;
    instackProduct = await Products.find({ inStock: { $gt: 0 } });
    if (instackProduct.length === 0) {
      return res.status(404).json({ message: "product not available" });
    }
    for (const product of instackProduct) {
      product.inStock -= 1;
      if (product.inStock <= 0) {
        product.isAvailable = false;
      }
      await product.save();
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
