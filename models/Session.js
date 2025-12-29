import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    screenNumber: {
      type: String,
    },
    abstractNumber: {
      type: String,
    },
    facultyName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    sessionName: {
      type: String,
    },
    topicName: {
      type: String,
    },
  },
  { timestamps: true }
);



export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
