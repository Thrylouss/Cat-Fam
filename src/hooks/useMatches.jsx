import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { getToken } from "../utils/token";

const useMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMatches = async () => {
        try {
            const response = await axios.get("/cats/matches/", {
                headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMatches(response.data);
    } catch (err) {
      setError(err);
      console.error("Failed to load matches", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches, loading, error, refetch: fetchMatches };
};

export default useMatches;
