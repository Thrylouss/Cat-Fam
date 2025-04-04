// src/utils/token.js

export const saveToken = (token) => {
    localStorage.setItem("petToken", token);
};

export const removeToken = () => {
    localStorage.removeItem("petToken");
};

export const getToken = () => {
    return localStorage.getItem("petToken");
};
