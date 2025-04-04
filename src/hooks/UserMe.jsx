// src/hooks/useUserMe.js
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { getToken } from "../utils/token";

const useUserMe = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // чтобы знать когда загрузка
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("/auth/users/me/", {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setUser(response.data);
            } catch (err) {
                setError(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    return { user, loading, error };
};

export default useUserMe;
