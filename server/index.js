import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import faceRoutes from "./routes/faceRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins for now so we can fetch from backend (can restrict later)
app.use(express.json()); // To Parse JSON bodies

app.use("/api/auth", authRoutes); // Creating endpoint for auth-related API calls
app.use("/api/user", userRoutes); // Creating endpoint for user-related API calls 
app.use("/api/face", faceRoutes); // Creating endpoint for face-related API calls

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});