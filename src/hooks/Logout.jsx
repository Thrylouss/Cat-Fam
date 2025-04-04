

const logout = () => {
    localStorage.removeItem("petAuth");
    window.location.href = "/auth";
};

export default logout;