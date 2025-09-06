import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { signUpUser } from "../utils/signUpUser.js"; 

export function SignUpSection({ onRouteChange, isSignedIn, setIsSignedIn, setUser }) {
    const [form, setForm] = useState({ name: "", email: "", password: ""});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            onRouteChange("/home");
        }
    }, [isSignedIn, onRouteChange]);
    
    if (isSignedIn) return null;

    function onInputChange(event) {
        setForm(prevForm => ({
            ...prevForm,
            [event.target.name]: event.target.value
        })); 
    }

    async function handleSignUp(event) {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const result = await signUpUser(form);
            if (result.success) {
                setIsSignedIn(true);
                setUser(result?.data || {});
                onRouteChange("/home");
            } else if (result.status === 429) {
                setError(resut.error || "5 requests per minute max. Please wait one minute, then try again.");
            } else {
                console.error(result.error || "Sign up failed.");
                if (result.status === 409) {
                    setError("Email already in use. Try signing in instead.")
                } else {
                    setError("Failed to sign up. Please try again.");
                }
            }
        } catch (err) {
            console.error("Error signing up: ", err);
        }
        setIsLoading(false);
    }

    return (
        <section className="auth-form-section">
            <div className="title-container">
                <h1>Detect faces in your photos.</h1>
                <p>This AI-powered app will find and highlight faces in your images.</p>
            </div>
            <article className="auth-form-card elements-container">
                <h2>Sign up to start</h2>
                <form onSubmit={handleSignUp} className="auth-form">
                    <div className="name-and-email-container">
                        <div className="label-and-input-container name sign-up">
                            <label htmlFor="input-name">Enter your name</label>
                            <input 
                                type="text" 
                                id="input-name" 
                                name="name" 
                                value={form.name}
                                onChange={onInputChange}
                                placeholder="Frodo Baggins" 
                                required
                            />
                        </div>
                        <div className="label-and-input-container email sign-up">
                            <label htmlFor="input-email">Enter your email</label>
                            <input 
                                type="email" 
                                id="input-email" 
                                name="email" 
                                value={form.email}
                                onChange={onInputChange}
                                placeholder="frodo.baggins@example.com" 
                                required
                            />
                        </div>
                    </div>
                    <div className="label-and-input-container password sign-up">
                        <label htmlFor="input-password">Create a password</label>
                        <input 
                            type="password" 
                            id="input-password" 
                            name="password" 
                            value={form.password}
                            onChange={onInputChange}
                            placeholder="•••••••" 
                            minLength={12}
                            maxLength={24}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>Sign up for free</button>
                </form>
                <div className="register-cta-container">
                    <p>Already have an account?</p>
                    <Link onClick={() => onRouteChange("/sign-in")} to="/sign-in">Sign in</Link>
                </div>
                {error && (
                    <div className="error-msg-container">
                        <span className="error-msg">{error}</span>
                    </div>
                )}
                {isLoading && (
                    <div className="loading-msg-container">
                        <span className="loading-msg">Loading...</span>
                    </div>
                )}
            </article>
        </section>
    );
}