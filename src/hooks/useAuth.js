// src/hooks/useAuth.js
import { useState } from "react";
import { loginRequest, registerRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (data) => {
        setLoading(true);
        try {
            const { access } = await loginRequest(data);
            localStorage.setItem("petToken", access);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        setLoading(true);
        try {
            await registerRequest(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return { login, register, loading, error };
};
