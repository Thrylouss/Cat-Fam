import React from "react";
import styles from "./styles.module.css";
import useMatches from "../../hooks/useMatches";
import { API_BASE_URL as BASE_URL } from "../../api/axiosInstance.js";
import useCatProfile from "../../hooks/useCatProfile.jsx";

const MatchesPage = () => {
    const { matches, loading, error } = useMatches();
    console.log(matches)

    if (loading) return <div className={styles.container}><p>Loading...</p></div>;
    if (error) return <div className={styles.container}><p>Error loading matches.</p></div>;

    return (
        <div className={styles.container}>
            <h1>💞 Mutual Matches</h1>
            {matches.length > 0 ? (
                <div className={styles.cards}>
                    {matches.map((match) => (
                        <div key={match.matched_cat.id} className={styles.card}>
                            <img
                                src={match.matched_cat.avatar ? `${BASE_URL}${match.matched_cat.avatar}` : "/default-avatar.png"}
                                alt={match.matched_cat.name}
                                className={styles.image}
                            />
                            <div className={styles.info}>
                                <h2>{match.matched_cat.name}</h2>
                                <p><strong>Age:</strong> {match.matched_cat.age}</p>
                                <p><strong>Breed:</strong> {match.matched_cat.breed}</p>
                                <p><strong>Gender:</strong> {match.matched_cat.gender}</p>
                                <p><strong>Phone:</strong> {match.matched_cat.owner_phone || "Not available"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No matches yet... 💔</p>
            )}
        </div>
    );
};

export default MatchesPage;
