import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>© {new Date().getFullYear()} CatFamily. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
