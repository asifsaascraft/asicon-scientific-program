import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = express.Router();

// Protected Routes
router.post("/users/sessions", protect, createSession);        // Create
router.get("/sessions", protect, getSessions);           // Get All
router.get("/sessions/:id", protect, getSessionById);     // Get by ID
router.put("/sessions/:id", protect, updateSession);      // Update
router.delete("/sessions/:id", protect, deleteSession);   // Delete

export default router;
