import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
      default: "",
    },
    subdescription: {
      type: String,
      default: "",
    },
    subcategory: {
      type: String,
      default: "",
    },
    color: [
      {
        type: String,
        default: "",
      },
    ],
    size: [
      {
        type: String,
        default: "",
      },
    ],
    isFeature: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);
export default Products;
