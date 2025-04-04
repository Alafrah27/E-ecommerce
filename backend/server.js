import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();

import userRoute from "./Router/User.route.js";
import productRoute from "./Router/Product.router.js";
import categorytRoute from "./Router/Category.route.js";
import sizeRoute from "./Router/Size.route.js";
import colorRoute from "./Router/Color.route.js";
import commentRoute from "./Router/Comment.route.js";
import notifictionRoute from "./Router/Notifiction.route.js";
import PaymentRoute from "./Router/payment.route.js";
import orderRoute from "./Router/Order.route.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://velvety-alpaca-677dee.netlify.app",
  "https://heartfelt-beignet-b49180.netlify.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categorytRoute);
app.use("/api/size", sizeRoute);
app.use("/api/color", colorRoute);
app.use("/api/comment", commentRoute);
app.use("/api/payments", PaymentRoute);
app.use("/api/order", orderRoute);
app.use("/api/notification", notifictionRoute);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port : " + PORT);
});
