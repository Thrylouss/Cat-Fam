import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { PawPrint, Menu, X } from "lucide-react";
import { logoutUser } from "../../api/auth";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/auth");
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <PawPrint size={24} strokeWidth={2} />
                <span>CatFam</span>
            </Link>

            <button className={styles.burger} onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
                <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink>
                <NavLink to="/notifications" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Notifications</NavLink>
                <NavLink to="/matches" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Matches</NavLink>
                <NavLink to="/profile" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Profile</NavLink>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;
