import express from "express";
import { ENV } from "../src/config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "../src/routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("api/users", userRoutes);

app.get("/", (req, res) => console.log("Hello from express Server"));
const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () =>
      console.log("Server is up adn running on PORT:", ENV.PORT)
    );
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
