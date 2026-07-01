import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "mobile is required"],
    },
    details: [
      {
        date: {
          type: String,
        },
        time: {
          type: String,
        },
        hallName: {
          type: String,
        },
        role: {
          type: String,
        },
        session: {
          type: String,
        },
        topic: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Faculty ||
  mongoose.model("Faculty", FacultySchema);
