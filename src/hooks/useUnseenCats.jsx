import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {getToken} from "../utils/token.js";

const useUnseenCats = () => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUnseenCats = async () => {
        try {
            const response = await axios.get("/cats/unseen/", {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setCats(response.data);
        } catch (err) {
            console.error("Failed to load unseen cats:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnseenCats();
    }, []);

    return { cats, loading, error, refetch: fetchUnseenCats };
};

export default useUnseenCats;
