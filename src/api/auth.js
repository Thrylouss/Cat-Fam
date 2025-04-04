// src/api/auth.js
import axios from "./axiosInstance";
import {getToken, removeToken} from "../utils/token.js";

export const loginRequest = async ({ username, password }) => {
    const response = await axios.post("/auth/jwt/create/", {
        username,
        password,
    });
    return response.data; // { access, refresh }
};

export const registerRequest = async (userData) => {
    const {
        username,    // Telegram username
        password,
        name,        // Pet name
        age,
        breed,
        gender,
        bio,
        phone,       // Phone will be saved as first_name
        avatar,
    } = userData;

    // 1. Регистрируем пользователя
    await axios.post("/auth/users/", {
        username,       // Сохраняем как Telegram username
        password,
        first_name: phone,  // Номер телефона сохраняем в поле first_name
    });

    // 2. Получаем токен после успешной регистрации
    const { access } = await loginRequest({ username, password });
    localStorage.setItem("petToken", access);

    // 3. Создаем кота для пользователя
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("bio", bio || "");
    formData.append("avatar", avatar);

    // 4. Отправляем запрос на создание кота без поля owner
    await axios.post("/cat/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
        },
    });

    return { access };
};


export const logoutUser = async () => {
    const token = getToken();

    try {
        if (token) {
            await axios.post("/auth/logout/", null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    } catch (err) {
        // console.error("Logout failed:", err);
    } finally {
        removeToken();
    }
};

