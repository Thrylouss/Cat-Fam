import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useCatProfile from "../../hooks/useCatProfile";
import axios from "../../api/axiosInstance";
import { getToken } from "../../utils/token";

export const ProfilePage = () => {
    const { profile, user, loading, error, refetch } = useCatProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);

    console.log(user)

    useEffect(() => {
        if (profile && user) {
            setFormData({
                ...profile,
                phone: user.first_name || "",
                telegram: user.username || "",  // Assuming that Telegram username is stored in username
            });
        }
    }, [profile, user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar" && files[0]) {
            setFormData({ ...formData, avatar: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const token = getToken();

            // 1. Обновляем профиль кота
            const catForm = new FormData();
            catForm.append("name", formData.name);
            catForm.append("age", formData.age);
            catForm.append("breed", formData.breed);
            catForm.append("gender", formData.gender);
            catForm.append("bio", formData.bio || "");
            if (formData.avatar instanceof File) {
                catForm.append("avatar", formData.avatar);
            }

            await axios.patch(`/cat/${profile.id}/`, catForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // 2. Обновляем данные пользователя
            await axios.patch("/auth/users/me/", {
                first_name: formData.phone,  // Phone saved as first_name
                username: formData.telegram,  // Update Telegram username
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsEditing(false);
            refetch();
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };


    if (loading) return <div className={styles.container}><p>Loading...</p></div>;
    if (error || !profile || !user) return <div className={styles.container}><p>Error loading profile.</p></div>;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img
                    src={profile.avatar ? `${profile.avatar}` : "/default-avatar.png"}
                    alt={profile.name}
                    className={styles.image}
                />
                <div className={styles.info}>
                    <h2>{profile.name}</h2>
                    <p><strong>Age:</strong> {profile.age}</p>
                    <p><strong>Breed:</strong> {profile.breed}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Phone:</strong> {user.first_name || "—"}</p>
                    <p><strong>Telegram:</strong> @{user.username || "—"}</p>
                    <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            </div>

            {isEditing && formData && (
                <div className={styles.modalOverlay} onClick={() => setIsEditing(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleSave} className={styles.form}>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                            <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" required />
                            <input name="breed" value={formData.breed} onChange={handleChange} placeholder="Breed" required />
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <textarea name="bio" value={formData.bio || ""} onChange={handleChange} placeholder="Bio" />
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required />
                            <input name="avatar" type="file" accept="image/*" onChange={handleChange} />
                            <button type="submit">Save</button>
                        </form>
                        <button className={styles.cancel} onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
