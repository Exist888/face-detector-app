import Joi from "joi";
import { updateUserEntries } from "../services/userService.js";

// Define the user schema
const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).required(),
    entries: Joi.number().integer().min(0)
});

export async function handleEntriesCount(req, res) {
    try {
        // Store request body as user
        const user = req.body;
        
        // Validate the user object shape
        const { error } = userSchema.validate(user);

        if (error) {
            console.error("Validation error in handleEntriesCount:", error.details);
            return res.status(400).json({
                success: false,
                error: "Invalid user data"
            });
        }

        // Call the service, pass in user, and store response
        const updatedUser = await updateUserEntries(user);

        // Return updated count from API call in express object
        return res.status(200).json({ 
            success: true, 
            data: { user: updatedUser } 
        });
    
    } catch (error) {
        console.error("Error in handleEntriesCount", error);
        return res.status(500).json({ 
            success: false, 
            error: "Failed to update entries. See logs for details."
        });
    }
}