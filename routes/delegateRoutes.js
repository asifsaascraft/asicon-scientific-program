import express from "express";

import {
  createDelegate,
  getAllDelegates,
  getDelegateById,
  updateDelegate,
  deleteDelegate,
  sendSingleDelegateEmail,
  sendBulkDelegateEmails,
} from "../controllers/delegateController.js";

const router = express.Router();

// Create
router.post("/", createDelegate);

// Get All
router.get("/", getAllDelegates);

// Get By Id
router.get("/:id", getDelegateById);

// Update
router.put("/:id", updateDelegate);

// Delete
router.delete("/:id", deleteDelegate);

// Send Single Email
router.post("/:id/send-email", sendSingleDelegateEmail);

// Send Bulk Email
router.post("/send-bulk-email", sendBulkDelegateEmails);

export default router;