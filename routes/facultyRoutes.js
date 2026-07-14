import express from "express";
import {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  sendSingleFacultyEmail,
  sendBulkFacultyEmails,
} from "../controllers/facultyController.js";

const router = express.Router();

router.post("/", createFaculty);


router.get("/", getAllFaculties);

router.get("/:id", getFacultyById);


router.put("/:id", updateFaculty);


router.delete("/:id", deleteFaculty);

router.post("/:id/send-email", sendSingleFacultyEmail);


router.post("/send-bulk-email", sendBulkFacultyEmails);

export default router;