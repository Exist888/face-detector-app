import validator from "validator";
import { callClarifaiApi } from "../services/faceService.js";

export async function handleFaceDetect(req, res) {
    try {
        // Destructure imageUrl from request body
        const { imageUrl } = req.body;

        // Check for non-existent image URL
        if (!imageUrl) {
            return res.status(400).json({ 
                success: false, 
                error: "Image URL is required."
            });
        }

        // Check for invalid image URL
        if (!validator.isURL(imageUrl, { protocols: ["http", "https"], require_protocol: true })) {
            return res.status(400).json({
                success: false,
                error: "Invalid image URL. Try again!"
            });
        }

        // Call the service, pass in imageUrl, and store response in array
        const faces = await callClarifaiApi(imageUrl);

        // Return faces from API call in express object
        return res.status(200).json({ 
            success: true, 
            data: { faces } 
        });
    
    } catch (error) {
        console.error("Error in handleFaceDetect", error);
        return res.status(500).json({ 
            success: false, 
            error: "Failed to detect faces. See logs for details."
        });
    }
}