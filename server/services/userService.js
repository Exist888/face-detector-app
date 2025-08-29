import db from "../config/db.js";

export async function updateUserEntries(userObj) {
    const { email } = userObj

    if (!email || typeof email !== "string") {
        throw new Error("Invalid email provided");
    }

    try {
        // Find user by matching email, increment entries, and return properties
        const updatedUsers = await db("users")
            .where({ email })
            .increment("entries", 1)
            .returning(["name", "email", "entries"]);

        // Extract single object from updatedUsers array
        const updatedUser = updatedUsers[0];

        // Return the updated user object
        return updatedUser;

    } catch (error) {
        console.error("Error updating user entries:", error);
        throw new Error("Failed to update user entries");
    }
}