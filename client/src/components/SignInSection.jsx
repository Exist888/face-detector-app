import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInUser } from "../utils/signInUser.js";

export function SignInSection({ onRouteChange, isSignedIn, setIsSignedIn, setUser }) {
    const [form, setForm] = useState({ email: "", password: ""});
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

    async function handleSignIn(event) {
        event.preventDefault();
        setError("");
        setIsLoading(true)
        try {
            const result = await signInUser(form);
            if (result.success) {
                setIsSignedIn(true);
                setUser(result?.data || {});
                onRouteChange("/home");
            } else if (result.status === 429) {
                setError(resut.error || "5 requests per minute max. Please wait one minute, then try again.");
            } else {
                setError(result.error || "Failed to sign in. Please try again.");
            }
        } catch (err) {
            console.error("Error signing in: ", err);
        }
        setIsLoading(false);
    }

    return (
        <section className="auth-form-section">
            <article className="auth-form-card elements-container">
                <h2>Sign in</h2>
                <form onSubmit={handleSignIn} className="auth-form">
                    <div className="label-and-input-container email sign-in">
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
                    <div className="label-and-input-container password sign-in">
                        <label htmlFor="input-password">Enter your password</label>
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
                    <button type="submit" disabled={isLoading}>Sign in</button>
                </form>
                <div className="register-cta-container">
                    <p>No account yet?</p>
                    <Link onClick={() => onRouteChange("/")} to="/">Sign up for free</Link>
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