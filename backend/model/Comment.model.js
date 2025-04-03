import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    content: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

// const calculateAverageRating = () => {
//     if (comments.length === 0) return 0;
//     const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
//     return (totalRating / comments.length).toFixed(2); // Returning average rounded to 2 decimal places
//   };
