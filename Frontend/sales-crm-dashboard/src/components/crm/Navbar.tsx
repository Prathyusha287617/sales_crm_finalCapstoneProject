import React, { useState } from 'react';
import styles from '../../styles/crm/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const roleName = sessionStorage.getItem('role');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <h1>Welcome, {roleName?.toLocaleUpperCase()}</h1>
      <div className={styles.profile}>
        <button onClick={toggleMenu} className={styles.profileButton}>
          Profile
        </button>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button>Account Settings</button>
            <button>Help</button>
            <button><Link to="/retail/signin">Log out</Link></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;