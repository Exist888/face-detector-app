import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation ({ onRouteChange, isSignedIn, setIsSignedIn, setImageUrl }) {
    const location = useLocation();
    const route = location.pathname;

    function handleLogoClick(event) {
        if (route === "/home") {
            event.preventDefault();
        }
    }

    return (
        <header>
            <div className="elements-container">
                <div className="logo-container">
                    <Link className="logo-text" to="/" onClick={handleLogoClick}>Face Detector App</Link>
                    <i 
                        className="fa-regular fa-face-grin-stars" 
                        aria-label="smiling emoji with star-shaped glasses"
                        >
                    </i>
                </div>
                <nav>
                    {isSignedIn ? (
                        <Fragment>
                            <Link 
                                onClick={() => setImageUrl("")}
                                className="refresh-link" 
                                to="/home"
                                >
                                <i 
                                    className="fa-solid fa-arrow-rotate-right"
                                    aria-label="refresh"
                                    >
                                </i>
                            </Link>
                            <button 
                                onClick={() => {
                                    setIsSignedIn(false);
                                    onRouteChange("/");
                                    setImageUrl("");
                                }}
                                >
                                Sign out
                            </button> 
                        </Fragment>
                    ) : !isSignedIn && route !== "/sign-in" ? (
                        <button
                            onClick={() => {
                                onRouteChange("/sign-in");
                                setImageUrl("");
                            }}
                            >
                            Sign in
                        </button> 
                    ) : (
                        <button
                            onClick={() => {
                                onRouteChange("/");
                                setImageUrl("");
                            }}
                            >
                            Sign up
                        </button> 
                    )}
                </nav>
            </div>
        </header>
    );
}