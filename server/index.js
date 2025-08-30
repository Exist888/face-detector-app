import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import faceRoutes from "./routes/faceRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Add a simple request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`); // Logs every incoming request's method and URL
    next();  // Proceed to the next middleware/route handler
});

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow headers
  next();
});
// app.use(cors()); // Allow all origins for now so we can fetch from backend (can restrict later)
app.use(express.json()); // To Parse JSON bodies

app.use("/api/auth", authRoutes); // Creating endpoint for auth-related API calls
app.use("/api/user", userRoutes); // Creating endpoint for user-related API calls 
app.use("/api/face", faceRoutes); // Creating endpoint for face-related API calls

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});