import Session from "../models/Session.js";
import sendEmailWithTemplate from "../utils/sendEmail.js";
import { formatDate } from "../utils/formatDateTime.js";

// =======================
// Create Session
// =======================
export const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);

    res.status(201).json({
      message: "Session created successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get All Sessions
// =======================
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });

    res.json({
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get Session by ID
// =======================
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Update Session
// =======================
export const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json({
      message: "Session updated successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Delete Session
// =======================
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// Send Email for Single Session
// ======================================
export const sendSessionEmail = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (!session.email)
      return res
        .status(400)
        .json({ message: "Email not available for this session" });

    // Prepare template merge fields
    const mergeInfo = {
      facultyName: session.facultyName,
      sessionName: session.sessionName,
      date: formatDate(session.date),
      startTime: session.startTime,
      endTime: session.endTime,
      facultyType: session.facultyType,
      topicName: session.topicName,
      hallName: session.hallName,
    };

    await sendEmailWithTemplate({
      to: session.email,
      name: session.facultyName || "Faculty",
      templateKey:
        "2518b.554b0da719bc314.k1.e6bab700-cc33-11f0-8d20-ae9c7e0b6a9f.19ac991e670",
      mergeInfo,
    });

    res.json({
      message: "Email sent successfully",
      sessionId: session._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// Send Emails to ALL Sessions
// ======================================
export const sendAllSessionEmails = async (req, res) => {
  try {
    const sessions = await Session.find();

    let sent = 0;
    let failed = 0;

    for (const s of sessions) {
      try {
        if (!s.email) {
          failed++;
          continue;
        }

        const mergeInfo = {
          facultyName: s.facultyName,
          sessionName: s.sessionName,
          date: formatDate(s.date),
          startTime: s.startTime,
          endTime: s.endTime,
          facultyType: s.facultyType,
          topicName: s.topicName,
          hallName: s.hallName,
        };

        await sendEmailWithTemplate({
          to: s.email,
          name: s.facultyName || "Faculty",
          templateKey:
            "2518b.554b0da719bc314.k1.e6bab700-cc33-11f0-8d20-ae9c7e0b6a9f.19ac991e670",
          mergeInfo,
        });

        sent++;
      } catch (e) {
        failed++;
      }
    }

    res.json({
      message: "Emails processed",
      total: sessions.length,
      sent,
      failed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
