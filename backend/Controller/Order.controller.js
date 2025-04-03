import Order from "../model/Order.model.js";
import { generateOrderId } from "../lib/generateOrderId.js";
import Notifications from "../model/Notifications.js";
import Products from "../model/Product.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const page = parseInt(req.query.page) || 1;
    const sortObj = req.query.sort;
    const statusObj = req.query.status;

    const query = {};

    if (statusObj) {
      const ordersByStatus = await Order.find({ status: statusObj });

      if (ordersByStatus.length > 0) {
        const statuses = ordersByStatus.map((item) => item.status);
        if (statuses.includes("pending")) {
          query.status = "pending";
        } else if (statuses.includes("completed")) {
          query.status = "completed";
        } else if (statuses.includes("cancelled")) {
          query.status = "cancelled";
        }
      } else {
        return res
          .status(404)
          .json({ message: "No orders found for the specified status." });
      }
    }

    let sortOptions = { createdAt: 1 };

    switch (sortObj) {
      case "asc":
        sortOptions = { totalAmount: 1 };
        break;
      case "desc":
        sortOptions = { totalAmount: -1 };
        break;

      case "new":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const order = await Order.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", " name lastname email")
      .populate("products");

    if (!order.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    const totalOrders = await Order.countDocuments(query);
    const hasMoreOrders = page * limit < totalOrders;

    res.status(200).json({ order, hasMoreOrders, totalOrders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name lastname email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const UserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrder = async (req, res) => {
  const { products } = req.body;

  if (products.length === 0 || !Array.isArray(products)) {
    return res.status(400).json({ message: "invaild products or empty cart" });
  }

  let totalAmount = 0;

  // Create order items
  const items = products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    image: product.image,
    color: product.color,
    size: product.size,
    stripeSessionId: Math.random().toString(36).substring(2, 9),
  }));

  // Calculate total amount
  totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  try {
    // Create the order
    const order = new Order({
      user: req.user._id,
      products: items,
      totalAmount,
      orderID: generateOrderId(), // Ensure this function exists
      paymentMethod: "cash",
      stripeSessionId: Math.random().toString(36).substring(2, 9),
    });

    // Save the order
    const newOrder = await order.save(); // Save and get the new order instance

    // Create notification
    const notifications = new Notifications({
      userId: req.user._id,
      message: `Order #${newOrder.orderID} has been created successfully thanks for your trust`, // Use new order's orderID
      orderId: newOrder._id,
      read: false,
    });

    // Save the notification
    await notifications.save();

    // Respond with the created order
    res.status(200).json(newOrder);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Internal server error", error });
    console.error(error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// export const updateOrder = async (req, res) => {
//   const { status } = req.body;
//   const orderId = req.params.id;
//   const userId = req.user._id;
//   try {
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     // Update the order status

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true, runValidators: true }
//     );

//     // Handle case where the order is not found
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found." });
//     }

//     // Prepare notification message based on the order status

//     res.json({ message: "Order status updated successfully", updatedOrder });

//     const message =
//       order.status === "completed"
//         ? "Your order is completed. 😍😎 We look forward to seeing you soon!"
//         : "We're sorry to inform you that your order has been cancelled. For more information, please contact us at: almusdarthafa999@gmail.com";

//     // Create a new notification
//     const notification = new Notifications({
//       userId:order.user,
//       message,
//       orderId: order._id,
//     });

//     // Save the notification
//     await notification.save();
//   } catch (error) {
//     // Handle unexpected errors
//     console.error("Error updating order status: ", error.message);
//     res
//       .status(500)
//       .json({ message: "Failed to update order status", error: error.message });
//   }
// };

export const updateOrders = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;
  const userId = req.user._id;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    const message =
      status === "completed"
        ? "Your order is completed. 😍😎 We look forward to seeing you soon!"
        : "We're sorry to inform you that your order has been cancelled. For more information, please contact us at: almusdarthafa999@gmail.com";

    const notification = new Notifications({
      userId: order.user,
      message,
      orderId: order._id,
    });

    await notification.save();

    res.json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order status: ", error.message);
    res
      .status(500)
      .json({ message: "Failed to update order status", error: error.message });
  }
};
export const Salseincome = async (req, res) => {
  try {
    // Get the total number of products
    const productCount = await Products.countDocuments();

    // Find all completed orders
    const orders = await Order.find({ status: "completed" });

    // Calculate total sales from completed orders
    const totalSales = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    // Avoid division by zero when calculating average sale per product
    const averageSalePerProduct =
      productCount > 0 ? Math.round(totalSales / productCount) : 0;

    // Calculate the total number of items sold
    const totalItemsSold = orders.reduce((arr, order) => {
      if (Array.isArray(order.products)) {
        return (
          arr +
          order.products.reduce(
            (acc, product) => acc + (product.quantity || 0),
            0
          )
        );
      }
      return arr;
    }, 0);

    // Send the response with calculated data
    res.status(200).json({
      productCount,
      totalSales,
      averageSalePerProduct,
      totalItemsSold,
    });
  } catch (error) {
    console.error("Error fetching income data:", error);
    res.status(500).json({
      message: "Internal server error",
      // Consider removing error from the response for security reasons
    });
  }
};
