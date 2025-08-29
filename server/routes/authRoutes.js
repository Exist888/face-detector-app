import express from "express";
import { handleSignIn, handleSignUp } from "../controllers/authController.js";

const router = express.Router();

// Creating endpoints for auth-related API calls
router.post("/sign-in", handleSignIn);
router.post("/sign-up", handleSignUp);

export default router;