import React, { useState } from "react";
import styles from "./styles.module.css";
import { Heart, ThumbsDown } from "lucide-react";
import useUnseenCats from "../../hooks/useUnseenCats";
import { useCatActions } from "../../hooks/useCatActions";
import { API_BASE_URL } from "../../api/axiosInstance.js";

export const HomePage = () => {
    const { cats, loading, error, refetch } = useUnseenCats();


    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [animating, setAnimating] = useState('');
    const [entering, setEntering] = useState(false);
    const { likeCat, dislikeCat } = useCatActions();

    const currentProfile = cats[currentIndex];

    const handleAction = async (action) => {
        if (!currentProfile || animating) return;

        setAnimating(action);

        try {
            if (action === 'like') {
                await likeCat(currentProfile.id);
                setLiked(prev => [...prev, currentProfile]);
            } else {
                await dislikeCat(currentProfile.id);
                setDisliked(prev => [...prev, currentProfile]);
            }
        } catch (err) {
            console.error("Ошибка при действии:", err);
        }

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setAnimating('');
            setEntering(true);
            setTimeout(() => setEntering(false), 300);
        }, 500);
    };

    const handleBack = () => {
        if (currentIndex === 0 || animating) return;
        const prevIndex = currentIndex - 1;
        const prevProfile = cats[prevIndex];
        setLiked(prev => prev.filter(p => p.id !== prevProfile.id));
        setDisliked(prev => prev.filter(p => p.id !== prevProfile.id));
        setCurrentIndex(prevIndex);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setLiked([]);
        setDisliked([]);
        refetch(); // получаем данные снова
    };

    if (loading) return <div className={styles.container}><p>Loading...</p></div>;
    if (error) return <div className={styles.container}><p>Error loading profiles.</p></div>;

    return (
        <div className={styles.container}>
            {currentIndex < cats.length ? (
                <div className={styles.cardStack}>
                    <div className={`${styles.card} ${
                        animating === 'like' ? styles.animateLike :
                            animating === 'dislike' ? styles.animateDislike : ''
                    } ${entering ? styles.enter : ''}`}>
                        <div className={styles.imageWrapper}>
                            <img src={currentProfile.avatar ? `${API_BASE_URL}${currentProfile.avatar}` : "/default-avatar.png"} alt="animal" className={styles.image} />
                        </div>
                        <div className={styles.overlay}>
                            <h2>{currentProfile.name}</h2>
                            <p><strong>Age:</strong> {currentProfile.age} y/o</p>
                            <p><strong>Breed:</strong> {currentProfile.breed}</p>
                            <p className={styles.description}><strong>About:</strong> {currentProfile.bio}</p>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.buttons}>
                                <button className={styles.dislike} onClick={() => handleAction('dislike')}>
                                    <ThumbsDown size={28} strokeWidth={2} />
                                </button>
                                <button className={styles.like} onClick={() => handleAction('like')}>
                                    <Heart size={28} strokeWidth={2} />
                                </button>
                            </div>
                            <button className={styles.back} onClick={handleBack}>← Back</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.result}>
                    <h2>🎉 You've viewed all profiles!</h2>
                    <p>❤️ Liked: {liked.map(p => p.name).join(', ') || 'None'}</p>
                    <p>👎 Disliked: {disliked.map(p => p.name).join(', ') || 'None'}</p>
                    <button className={styles.restart} onClick={handleRestart}>🔁 Start Over</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
