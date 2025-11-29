import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/userModel.js";

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  }
);

export const syncUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized: no user ID found" });
      return;
    }

    //   check if user already exists
    const existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      res
        .status(200)
        .json({ user: existingUser, message: "User already exists" });
      return;
    }

    // create new user from clerk data

    const clerkUser = await clerkClient.users.getUser(userId);

    const userData = {
      clerkId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
      profilePicture: clerkUser.imageUrl || "",
    };

    const user = await User.create(userData);

    res.status(201).json({ user, message: "User created Successfully" });
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    // Handle case where userId is null
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: no user ID found" });
      return;
    }

    const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  }
);
