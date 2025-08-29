import { Routes, Route, useNavigate } from "react-router-dom";
import { Fragment, useRef, useState, useEffect } from "react";
import { Navigation } from "./components/Navigation.jsx";
import { VideoBr } from "./components/VideoBr.jsx";
import { SignUpSection } from "./components/SignUpSection.jsx";
import { SignInSection } from "./components/SignInSection.jsx";
import { Greeting } from "./components/Greeting.jsx";
import { Intro } from "./components/Intro.jsx";
import { ImageLinkForm } from "./components/ImageLinkForm.jsx";
import { ImageBox } from "./components/ImageBox.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { calculateFaceBoxes } from "./utils/calculateFaceBoxes.js";
import { updateUserEntries } from "./utils/updateUserEntries.js";
import "./index.css";

export function App() {
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [faces, setFaces] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLoadingFaceBox, setIsLoadingFaceBox] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({});

    function onRouteChange(route) {
        navigate(route);
    }

    async function onImageLoad() {
        setIsImageLoaded(true);
        const result = await updateUserEntries(user);

        if (result.success) {
            setUser((prevUser) => ({
                ...prevUser,
                entries: result.data.user.entries
            }));
        } else {
            console.error("Failed to update entries: ", result.error);
        }
    }

    // Create drawing coordinates from API response and set boxes state
    // Only run after image loads and faces return from API call
    useEffect(() => {
        if (!imageRef.current || faces.length === 0 || !isImageLoaded) return;

        const { width, height } = imageRef.current.getBoundingClientRect();

        const faceBoxes = calculateFaceBoxes(faces, width, height);
        setBoxes(faceBoxes);
        setIsLoadingFaceBox(false);
        console.log("Face boxes: ", faceBoxes);
    }, [isImageLoaded, faces]);

    return (
        <Fragment>
            <Navigation 
                onRouteChange={onRouteChange} 
                isSignedIn={isSignedIn} 
                setIsSignedIn={setIsSignedIn}
                setImageUrl={setImageUrl}
            />
            <main>
                <VideoBr />
                <Routes>
                    <Route path="/" element={
                        <SignUpSection 
                            onRouteChange={onRouteChange} 
                            isSignedIn={isSignedIn}
                            setIsSignedIn={setIsSignedIn}
                            setUser={setUser}
                        />
                    } />
                    <Route path="/sign-in" element={
                        <SignInSection 
                            onRouteChange={onRouteChange}
                            isSignedIn={isSignedIn}
                            setIsSignedIn={setIsSignedIn}
                            setUser={setUser}
                        />
                    } />
                    <Route path="/home" element={
                        <ProtectedRoute isSignedIn={isSignedIn}>
                            <Greeting user={user} />
                            <Intro />
                            <ImageLinkForm 
                                input={input}
                                setInput={setInput}
                                setImageUrl={setImageUrl}
                                setIsImageLoaded={setIsImageLoaded}
                                setIsLoadingFaceBox={setIsLoadingFaceBox}
                                setBoxes={setBoxes}
                                setFaces={setFaces}
                            />
                            {imageUrl && (
                                <ImageBox 
                                    imageUrl={imageUrl} 
                                    imageRef={imageRef}
                                    onImageLoad={onImageLoad}
                                    isLoadingFaceBox={isLoadingFaceBox}
                                    boxes={boxes}
                                /> 
                            )}                        
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
        </Fragment>
    );
}