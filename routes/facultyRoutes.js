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

/**
 * @swagger
 * /api/faculties:
 *   post:
 *     tags:
 *       - Faculty
 *     summary: Create Faculty
 *     description: Create a new faculty.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacultyRequest'
 *     responses:
 *       201:
 *         description: Faculty created successfully.
 *       400:
 *         description: Validation failed.
 *       500:
 *         description: Internal server error.
 */
router.post("/", createFaculty);

/**
 * @swagger
 * /api/faculties:
 *   get:
 *     tags:
 *       - Faculty
 *     summary: Get All Faculties
 *     description: Returns all faculties.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Faculty list fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Faculty'
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllFaculties);

/**
 * @swagger
 * /api/faculties/{id}:
 *   get:
 *     tags:
 *       - Faculty
 *     summary: Get Faculty By ID
 *     description: Returns single faculty.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Faculty Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Faculty fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       404:
 *         description: Faculty not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", getFacultyById);

/**
 * @swagger
 * /api/faculties/{id}:
 *   put:
 *     tags:
 *       - Faculty
 *     summary: Update Faculty
 *     description: Update faculty details.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Faculty Id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacultyRequest'
 *     responses:
 *       200:
 *         description: Faculty updated successfully.
 *       404:
 *         description: Faculty not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", updateFaculty);

/**
 * @swagger
 * /api/faculties/{id}:
 *   delete:
 *     tags:
 *       - Faculty
 *     summary: Delete Faculty
 *     description: Delete faculty by id.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Faculty Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Faculty deleted successfully.
 *       404:
 *         description: Faculty not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", deleteFaculty);

/**
 * @swagger
 * /api/faculties/{id}/send-email:
 *   post:
 *     tags:
 *       - Faculty
 *     summary: Send Faculty Email
 *     description: Send schedule email to a single faculty.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Faculty Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       404:
 *         description: Faculty not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/:id/send-email", sendSingleFacultyEmail);

/**
 * @swagger
 * /api/faculties/send-bulk-email:
 *   post:
 *     tags:
 *       - Faculty
 *     summary: Send Bulk Faculty Emails
 *     description: Send schedule email to all faculties.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Bulk email process completed.
 *       404:
 *         description: No faculty found.
 *       500:
 *         description: Internal server error.
 */
router.post("/send-bulk-email", sendBulkFacultyEmails);

export default router;