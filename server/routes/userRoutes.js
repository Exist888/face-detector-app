import express from "express";
import { handleEntriesCount } from "../controllers/userController.js";

const router = express.Router();

// Creating endpoint for user-related API calls
router.put("/update-entries", handleEntriesCount);

export default router;