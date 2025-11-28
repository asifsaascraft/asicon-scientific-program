import Session from "../models/Session.js";

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

    if (!session)
      return res.status(404).json({ message: "Session not found" });

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
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!session)
      return res.status(404).json({ message: "Session not found" });

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

    if (!session)
      return res.status(404).json({ message: "Session not found" });

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
