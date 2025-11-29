import express, { Application, Request, Response } from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () =>
      console.log("Server is up and running on PORT:", ENV.PORT)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
