import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  sendSessionEmail,
  sendAllSessionEmails,
} from "../controllers/sessionController.js";

const router = express.Router();

// Protected Routes
router.post("/users/sessions", protect, createSession);        // Create
router.get("/sessions", protect, getSessions);           // Get All
router.get("/sessions/:id", protect, getSessionById);     // Get by ID
router.put("/sessions/:id", protect, updateSession);      // Update
router.delete("/sessions/:id", protect, deleteSession);   // Delete

// Send email to a single session
router.post("/sessions/:id/send-email", protect, sendSessionEmail);

// Send email to all sessions
router.post("/sessions/send-all-emails", protect, sendAllSessionEmails);

export default router;
