import React from "react";
import { Navigate } from "react-router-dom";
import useUserMe from "../hooks/UserMe.jsx";

const ProtectedRoute = ({ children }) => {
    const { user, loading, error } = useUserMe();

    if (loading) return <div>Loading...</div>;
    if (error || !user) return <Navigate to="/auth" replace />;

    return children;
};

export default ProtectedRoute;
