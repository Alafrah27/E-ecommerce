import mongoose from "mongoose";
const notifictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Notifications = mongoose.model("Notifications", notifictionSchema);
export default Notifications;
