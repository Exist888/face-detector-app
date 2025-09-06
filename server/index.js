import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import faceRoutes from "./routes/faceRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const allowedOrigins = [
    "http://localhost:5173",
    "https://face-detector.netlify.app"
]

app.use(cors({ origin: allowedOrigins }));

app.use(express.json()); // To Parse JSON bodies

app.use("/api/auth", authRoutes); // Creating endpoint for auth-related API calls
app.use("/api/user", userRoutes); // Creating endpoint for user-related API calls 
app.use("/api/face", faceRoutes); // Creating endpoint for face-related API calls

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});