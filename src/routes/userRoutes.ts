import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  syncUser,
  getCurrentUser,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

// public routes
router.get("/profile/:username", getUserProfile);

// private routes
router.post("/sync", protectRoute, syncUser);
router.post("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute, updateProfile);

// follow a news source
// router.post("/follow/:tergetNewsId", protectRoute, followNews);

export default router;
