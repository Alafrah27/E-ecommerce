import mongoose from "mongoose";
const colorSchema = new mongoose.Schema(
  {
    colors: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);
export default Color;
