import Faculty from "../models/Faculty.js";
import sendEmailWithTemplate from "../utils/sendEmail.js";
import { formatDate, formatTime } from "../utils/formatDateTime.js";

// ==========================
// Create Faculty
// ==========================
export const createFaculty = async (req, res) => {
  try {
    const { name, email, mobile, details } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Name, email and mobile are required",
      });
    }

    const faculty = await Faculty.create({
      name,
      email,
      mobile,
      details: details || [],
    });

    res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      data: faculty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Faculties
// ==========================
export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faculties.length,
      data: faculties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Faculty By ID
// ==========================
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Faculty
// ==========================
export const updateFaculty = async (req, res) => {
  try {
    const { name, email, mobile, details } = req.body;

    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    if (name !== undefined) faculty.name = name;
    if (email !== undefined) faculty.email = email;
    if (mobile !== undefined) faculty.mobile = mobile;

    // Replace entire details array
    if (details !== undefined) {
      faculty.details = details;
    }

    await faculty.save();

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      data: faculty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Faculty
// ==========================
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    await faculty.deleteOne();

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ==========================
// Generate Faculty Schedule HTML
// ==========================
const generateScheduleTable = (details = []) => {
  if (!details.length) {
    return `
      <tr>
        <td colspan="6" style="padding:12px;text-align:center;">
          No sessions assigned.
        </td>
      </tr>
    `;
  }

  return details
    .map(
      (item) => `
      <tr>
        <td>${formatDate(item.date)}</td>
        <td>${formatTime(item.time)}</td>
        <td>${item.hallName || "-"}</td>
        <td>${item.role || "-"}</td>
        <td>${item.session || "-"}</td>
        <td>${item.topic || "-"}</td>
      </tr>
    `
    )
    .join("");
};

// ==========================
// Send Email to Single Faculty
// ==========================
export const sendSingleFacultyEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const tableRows = generateScheduleTable(faculty.details);

    await sendEmailWithTemplate({
      to: faculty.email,
      name: faculty.name,
      templateKey: "2518b.554b0da719bc314.k1.24519ca0-738c-11f1-84db-62df313bf14d.19f1247b36a",
      mergeInfo: {
        faculty_name: faculty.name,
        mobile: faculty.mobile,
        schedule_rows: tableRows,
      },
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ==========================
// Send Email to All Faculties
// ==========================
export const sendBulkFacultyEmails = async (req, res) => {
  try {
    const faculties = await Faculty.find();

    if (!faculties.length) {
      return res.status(404).json({
        success: false,
        message: "No faculty found.",
      });
    }

    let successCount = 0;
    let failedCount = 0;
    const failedEmails = [];

    for (const faculty of faculties) {
      try {
        const tableRows = generateScheduleTable(faculty.details);

        await sendEmailWithTemplate({
          to: faculty.email,
          name: faculty.name,
          templateKey: "2518b.554b0da719bc314.k1.24519ca0-738c-11f1-84db-62df313bf14d.19f1247b36a",
          mergeInfo: {
            faculty_name: faculty.name,
            mobile: faculty.mobile,
            schedule_rows: tableRows,
          },
        });

        successCount++;
      } catch (err) {
        failedCount++;

        failedEmails.push({
          email: faculty.email,
          error: err.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Bulk email process completed.",
      total: faculties.length,
      successCount,
      failedCount,
      failedEmails,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};