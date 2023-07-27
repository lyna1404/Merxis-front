// HomePage.js
import React from 'react';
import styles from './homePage.module.css'; // Importing the CSS module
import logo from '../ressources/images/logo_merxis.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className={styles.homePage}> {/* Use the CSS module class */}
      <div className={styles.sectionButtons}> {/* Use the CSS module class */}
        <Link to="/archivage" className={styles.button}>Archivage</Link>
        <Link to="/declaration" className={styles.button}>Déclaration</Link>
        <Link to="/comptabilite" className={styles.button}>Comptabilité</Link>
        <Link to="/facturation" className={styles.button}>Facturation</Link>
        <Link to="/gestionClients" className={styles.button} name = 'Gestion des clients'>Gestion des clients</Link>
      </div>
      <div className={styles.imageContainer}> {/* Use the CSS module class */}
        <img src={logo} alt="Placeholder" />
      </div>
    </div>
  );
};

export default HomePage;
