import React, { useState } from "react";
import styles from "./styles.module.css";
import { useAuth } from "../../hooks/useAuth"; // Убедись, что хук правильно возвращает функции

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const { login, register, loading, error } = useAuth(); // Хук для логина и регистрации

    const [form, setForm] = useState({
        username: "",    // Telegram username
        password: "",
        name: "",
        age: "",
        breed: "",
        gender: "",
        phone: "",       // phone = first_name
        bio: "",
        avatar: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setForm({ ...form, avatar: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegister) {
            // При регистрации
            const formData = new FormData();
            // Заполняем formData для отправки
            for (let key in form) {
                formData.append(key, form[key]);
            }
            // Передаем данные в функцию регистрации
            register({
                username: form.username,
                password: form.password,
                name: form.name,
                age: form.age,
                breed: form.breed,
                gender: form.gender,
                phone: form.phone,
                bio: form.bio,
                avatar: form.avatar,
            });
        } else {
            // При логине
            login({ username: form.username, password: form.password });
        }
    };

    const toggleForm = () => setIsRegister(!isRegister);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>{isRegister ? "Create an Account" : "Welcome Back"}</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            {/* Поля для регистрации */}
                            <input type="text" name="name" placeholder="Pet name" required onChange={handleChange} />
                            <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
                            <input type="text" name="breed" placeholder="Breed" required onChange={handleChange} />
                            <input type="tel" name="phone" placeholder="Phone number" required onChange={handleChange} />
                            <select name="gender" required onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <textarea name="bio" placeholder="Bio (optional)" rows={3} onChange={handleChange} />
                            <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                        </>
                    )}

                    {/* Общие поля для авторизации и регистрации */}
                    <input type="text" name="username" placeholder="Telegram Username" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />

                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : isRegister ? "Register" : "Login"}
                    </button>
                </form>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                <p className={styles.toggle}>
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <span onClick={toggleForm}>
                        {isRegister ? " Login" : " Register"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
