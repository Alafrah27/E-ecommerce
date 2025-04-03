import Notifications from "../model/Notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find({
      userId: req.user._id,
    })
      .populate("orderId", "orderID")
      .populate("userId", "name lastname")
      .sort({ createdAt: -1 });
    if (!notifications) {
      return res.status(404).json({ message: "Notifications not found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error);
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notifications.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.read = true;
    await notification.save();
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notifications.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
