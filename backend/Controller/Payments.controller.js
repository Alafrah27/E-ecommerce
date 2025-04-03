import { generateOrderId } from "../lib/generateOrderId.js";
import Stripe from "../lib/Stripe.js";
import Notifications from "../model/Notifications.js";
import Order from "../model/Order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;

    if (products.length === 0 || !Array.isArray(products)) {
      return res
        .status(400)
        .json({ message: "invaild products or empty cart" });
    }
    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "sar",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
      metadata: {
        userId: req.user._id.toString(),
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
            name: p.name,
            image: p.image,
            size: p.size,
            color: p.color,
          }))
        ),
      },
    });

    return res.status(200).json({ id: session.id, totalAmount });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Stripe.checkout.sessions.retrieve(sessionId);
    // console.log("check session from checkout success", session);

    if (session.payment_status === "paid") {
      const products = JSON.parse(session.metadata.products);
      // console.log("products from metadata", products);
      const ID = generateOrderId();
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
          name: product.name,
          image: product.image,
          size: product.size,
          color: product.color,
        })),
        orderID: ID,
        paymentMethod: "online",
        totalAmount: session.amount_total / 100, // convert from cents to dollars
        stripeSessionId: sessionId,
      });

      await newOrder.save();
      const notifications = new Notifications({
        userId: session.metadata.userId,
        message: `Order #${ID} has been created successfully`,
        orderId: newOrder._id,
        read: false,
      });

      await notifications.save();

      return res.status(200).json({
        message: "Order created successfully",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};
