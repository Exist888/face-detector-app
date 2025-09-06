import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function callClarifaiApi(imageUrl) {
    try {
        if (!imageUrl || typeof imageUrl !== "string") {
            throw new Error("Invalid imageUrl parameter");
        }
        
        // Clarifai API details - from hidden .env file
        const PAT = process.env.PAT;
        const USER_ID = process.env.USER_ID;
        const APP_ID = process.env.APP_ID;
        const MODEL_ID = process.env.MODEL_ID;
        const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID;

        // Raw content of api request as a stringified object
        const raw = JSON.stringify({
            user_app_id: { user_id: USER_ID, app_id: APP_ID },
            inputs: [{ data: { image: { url: imageUrl } } }]
        });

        // Await respone from API call to Clarifai
        const clarifaiResponse = await fetch(
            `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Key " + PAT
                },
                body: raw
            }
        );

        // Handle error for unsuccessful API call
        if (!clarifaiResponse.ok) {
            const errorData = await clarifaiResponse.json();
            console.error("Clarifai API error: ", errorData);
            throw new Error("Clarifai API error");
        }

        // Store API call result if passes check above
        const result = await clarifaiResponse.json();

        // Extract regions (faces) from response
        const regions = result.outputs?.[0]?.data?.regions || [];

        // Map through regions array to get box sides for each face
        const faces = regions.map((region) => {
            const box = region.region_info.bounding_box;
            const concepts = region.data.concepts.map((concept) => ({
                name: concept.name,
                value: Number(concept.value.toFixed(4))
            }));

            // Each face is an object that contains a bounding box (with coordinates) and a nested objects array
            return {
                boundingBox: {
                    topRow: Number(box.top_row.toFixed(3)),
                    leftCol: Number(box.left_col.toFixed(3)),
                    bottomRow: Number(box.bottom_row.toFixed(3)),
                    rightCol: Number(box.right_col.toFixed(3))
                },
                concepts
            }
        });

        // Return the array of faces to complete the request
        return faces;

    } catch(error) {
        console.error("Error in callClarifaiApi:", error);
        throw new Error("Error calling Clarifai API");
    }
}