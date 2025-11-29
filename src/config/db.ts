import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to MONGODB successfully");
  } catch (error) {
    console.log("Error connecting to MONGODB");
    process.exit(1);
  }
};
