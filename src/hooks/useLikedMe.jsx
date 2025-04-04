import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { getToken } from "../utils/token";

const useLikedMe = () => {
    const [likedBy, setLikedBy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLiked = async () => {
        try {
            const response = await axios.get("/cats/liked-me/", {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setLikedBy(response.data);
        } catch (err) {
            setError(err);
            console.error("Ошибка при получении лайков:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiked();
    }, []);

    return { likedBy, loading, error, refetch: fetchLiked };
};

export default useLikedMe;
