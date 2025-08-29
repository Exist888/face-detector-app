import express from "express";
import { handleFaceDetect } from "../controllers/faceController.js";

const router = express.Router();

// Creating endpoint for face-related API calls
router.post("/face-detect", handleFaceDetect);

export default router;