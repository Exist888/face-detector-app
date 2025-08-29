import { Navigate } from "react-router-dom";

export function ProtectedRoute({ isSignedIn, children }) {
    if (!isSignedIn) {
        return <Navigate to="/" replace />
    }
    return children;
}