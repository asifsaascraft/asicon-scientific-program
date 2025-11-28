import express from "express";
import cookieParser from "cookie-parser";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(cookieParser());

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Token refresh
router.get("/refresh-token", refreshAccessToken);

// Logout
router.post("/logout", protect, logoutUser);



export default router;
