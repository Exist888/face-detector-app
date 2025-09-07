import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import faceRoutes from "./routes/faceRoutes.js";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const allowedOrigins = [
    "http://localhost:5173",
    "https://face-detector.netlify.app"
]

app.use(cors({ origin: allowedOrigins }));

// Rate limiter to be passed into all routes
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "5 requests per minute max. Please wait one minute, then try again."
        });
    }
});

// To parse JSON bodies
app.use(express.json());

// Creating endpoints for auth-related, user-related, and face-related API calls
app.use("/api/auth", limiter, authRoutes);
app.use("/api/user", limiter, userRoutes);
app.use("/api/face", limiter, faceRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});