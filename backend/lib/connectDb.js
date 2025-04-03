import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mogo_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mogo_url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
