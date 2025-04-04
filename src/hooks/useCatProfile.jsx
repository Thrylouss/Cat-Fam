import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { getToken } from "../utils/token";

const useCatProfile = () => {
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        try {
            const token = getToken();

            const userRes = await axios.get("/auth/users/me/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const catsRes = await axios.get("/cat/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const currentCat = catsRes.data.find((c) => c.owner === userRes.data.id);

            setUser(userRes.data);
            setProfile(currentCat);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return { profile, user, loading, error, refetch: fetchProfile };
};

export default useCatProfile;
