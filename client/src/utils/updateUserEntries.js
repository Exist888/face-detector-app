const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// Pass in full user object for easy one to one matching
export async function updateUserEntries(user) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/user/update-entries`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || "User not found" };
        }

        // Parse the json response and return data for frontend to check whether success or error
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error searching for user: ", error);
        // Return consistent error object
        return { success: false, error: "Network error" };
    }
}