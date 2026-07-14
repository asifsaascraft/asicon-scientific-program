import mongoose from "mongoose";

const DelegateSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: [true, "Title is required"],
    }
  },
  { timestamps: true },
);

export default mongoose.models.Delegate ||
  mongoose.model("Delegate", DelegateSchema);
