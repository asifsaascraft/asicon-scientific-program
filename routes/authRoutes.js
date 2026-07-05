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

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register User
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Email already registered or validation failed.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     description: Login using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Forgot Password
 *     description: Send password reset email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset email sent.
 *       404:
 *         description: Email not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/users/reset-password/{token}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset Password
 *     description: Reset password using reset token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       400:
 *         description: Invalid or expired token.
 *       500:
 *         description: Internal server error.
 */
router.post("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /api/users/refresh-token:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Refresh Access Token
 *     description: Generate a new access token using refresh token stored in cookies.
 *     responses:
 *       200:
 *         description: Access token generated successfully.
 *       401:
 *         description: Invalid or missing refresh token.
 */
router.get("/refresh-token", refreshAccessToken);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout User
 *     description: Logout current user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: Unauthorized.
 */
router.post("/logout", protect, logoutUser);

export default router;