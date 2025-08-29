const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// Pass in credentials object which contains email and password
export async function signInUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        // Parse the json response and return data for frontend to check whether success or error
        const data = await response.json();
        
        if (!response.ok) {
            return { 
                success: false, 
                status: response.status,
                error: data.error || "Sign in failed" 
            };
        }

        return {
            success: true,
            status: response.status,
            data: data.data
        }

    } catch (error) {
        console.error("Error signing in: ", error);
        // Return consistent error object
        return { 
            success: false, 
            status: 500,
            error: "Network error" 
        };
    }
}