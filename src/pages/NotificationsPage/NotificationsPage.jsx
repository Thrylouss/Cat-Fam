import React from "react";
import styles from "./styles.module.css";
import useLikedMe from "../../hooks/useLikedMe";
import { useCatActions } from "../../hooks/useCatActions";
import {Heart, ThumbsDown} from "lucide-react";

const NotificationsPage = () => {
    const { likedBy, loading, error, refetch } = useLikedMe();
    const { likeCat, dislikeCat } = useCatActions();

    const handleLikeBack = async (id) => {
        try {
            await likeCat(id);
            // Перезапросим, чтобы исчезла карточка после лайка
            refetch();
        } catch (err) {
            console.error("Ошибка при ответном лайке:", err);
        }
    };

    const handleDisLikeBack = async (id) => {
        try {
            await dislikeCat(id);
            // Перезапросим, чтобы исчезла карточка после лайка
            refetch();
        } catch (err) {
            console.error("Ошибка при ответном лайке:", err);
        }
    };

    if (loading) return <div className={styles.container}><p>Loading...</p></div>;
    if (error) return <div className={styles.container}><p>Error loading notifications.</p></div>;

    return (
        <div className={styles.container}>
            <h1>🔔 Notifications</h1>
            {likedBy.length > 0 ? (
                <div className={styles.cards}>
                    {likedBy.map((pet) => (
                        <div key={pet.id} className={styles.card}>
                            <img
                                src={pet.avatar ? `${pet.avatar}` : "/default-avatar.png"}
                                alt={pet.name}
                                className={styles.image}
                            />
                            <div className={styles.info}>
                                <h2>{pet.name}</h2>
                                <p><strong>Age:</strong> {pet.age}</p>
                                <p><strong>Breed:</strong> {pet.breed}</p>
                                <p><strong>Gender:</strong> {pet.gender}</p>
                                <div className={styles.containerName}>
                                    <button className={styles.likeBackBtn} onClick={() => handleLikeBack(pet.id)}>
                                        <Heart size={28} strokeWidth={2}/>
                                    </button>
                                    <button className={styles.likeBackBtn} onClick={() => handleDisLikeBack(pet.id)}>
                                        <ThumbsDown size={28} strokeWidth={2}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>No new likes yet...</p>
            )}
        </div>
    );
};

export default NotificationsPage;
