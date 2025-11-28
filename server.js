import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
await connectDB();

const app = express();

// =======================
// CORS setup for multiple frontends
// =======================
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow any origin (including browser requests)
    callback(null, true);
  },
  credentials: true,
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); // Needed to read cookies (refresh token)
app.use(morgan("dev"));

// =======================
// Health check
// =======================
app.get("/", (req, res) => {
  res.send("ASICON Scientific Program Backend is running ..... ");
});

// =======================
// API Routes
// =======================
app.use("/api/users", authRoutes);
app.use("/api", sessionRoutes);

// =======================
// Start server
// =======================


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
