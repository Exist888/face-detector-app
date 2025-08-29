import { useState } from "react";
import { fetchFacesFromServer } from "../utils/fetchFacesFromServer.js";

export function ImageLinkForm({ 
    input, 
    setInput,
    setImageUrl,
    setIsImageLoaded, 
    setIsLoadingFaceBox, 
    setBoxes,
    setFaces,
}) {
    const [error, setError] = useState("");

    function onInputChange(event) {
        setInput(event.target.value);
        setIsLoadingFaceBox(false);
        setIsImageLoaded(false);
        setFaces([]);
    }

    async function onFormSubmit(event) {
        event.preventDefault();
        setIsImageLoaded(false); // reset to false before image loads
        setBoxes([]);
        setIsLoadingFaceBox(true);
        setImageUrl(input);
        setError("");
        try {
            const facesFromServer = await fetchFacesFromServer(input);
            setFaces(facesFromServer);
        } catch (err) {
            setError(err?.message || "Something went wrong. Please try again.");
            setImageUrl("");
        }
        setInput("");
    }

    return (
        <section className="image-link-form-section">
            <div className="elements-container">
                <form onSubmit={onFormSubmit}>
                    <div className="input-section">
                        <label htmlFor="input">Paste your image URL here:</label>
                        <input 
                            onChange={onInputChange}
                            value={input}
                            type="text" 
                            id="input" 
                            name="input" 
                            autoFocus 
                            required
                        />
                    </div>
                    <button type="submit">Detect Faces</button>
                    {error && (
                        <div className="error-msg-container url-error">
                            <span className="error-msg">{error}</span>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}