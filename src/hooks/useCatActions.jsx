// src/hooks/useCatActions.js
import axios from "../api/axiosInstance";
import { getToken } from "../utils/token";

export const useCatActions = () => {
    const likeCat = async (id) => {
        try {
            const response = await axios.post(`/cat/${id}/like/`, null, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            return response.data;
        } catch (error) {
            console.error("Like error:", error);
            throw error;
        }
    };

    const dislikeCat = async (id) => {
        try {
            const response = await axios.post(`/cat/${id}/dislike/`, null, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            return response.data;
        } catch (error) {
            console.error("Dislike error:", error);
            throw error;
        }
    };

    return { likeCat, dislikeCat };
};
