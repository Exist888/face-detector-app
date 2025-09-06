const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchFacesFromServer(input) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/face/face-detect`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: input })
        });

        const result = await response.json();
        
        if (!response.ok) {
            // Throw the backend's custom error message
            throw new Error(result.error || "Face detection failed.");
        }

        const faces = result.data.faces;
        return faces;

    } catch (error) {
        console.error("Error fetching from server: ", error);
        throw error; // Re-throw so component can handle it
    }
}