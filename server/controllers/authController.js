import Joi from "joi";
import { signInUser, signUpUser } from "../services/authService.js";

const signInSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(12).max(24).trim().required()
});

export async function handleSignIn(req, res) {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Validate user input object from sign in form
    const { error } = signInSchema.validate({ email, password });

    if (error) {
        return res.status(400).json({
            success: false,
            error: "Invalid input data"
        });
    }

    try {
        // Send email and password into signInUser function to find match
        const user = await signInUser(email, password);

        if (user) {
            const { name, entries } = user;
            return res.status(200).json({
                success: true,
                data: { email, name, entries }
            });
        } else {
            return res.status(400).json({
                success: false,
                error: "Error signing in."
            });
        }
    } catch (err) {
        console.error("Sign in error: ", err);
        return res.status(500).json({
            success: false,
            error: "Failed to find credentials."
        });
    }
}

const signUpSchema = Joi.object({
    name: Joi.string().min(1).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(12).max(24).trim().required()
});

export async function handleSignUp(req, res) {
    // Destructure name, email, and password from request body
    const { name, email, password } = req.body;

    // Validate user input object from sign up form
    const { error } = signUpSchema.validate({ name, email, password });

    if (error) {
        return res.status(400).json({
            success: false,
            error: "Invalid input data"
        });
    }

    try {
        // Send name, email, and password into signUpUser function
        const newUser = await signUpUser(name, email, password);

        if (newUser) {
            const { entries } = newUser;
            return res.status(201).json({
                success: true,
                data: { name, email, entries }
            });
        } else {
            return res.status(401).json({
                success: false,
                error: "Error signing up."
            });
        }
    } catch (err) {
        console.error("Sign up error: ", err);

        if (err.message === "Email already registered") {
            return res.status(409).json({
                success: false,
                error: "This email is already registered. Try signing in."
            });
        }

        return res.status(500).json({
            success: false,
            error: "Failed to register user."
        });
    }
}