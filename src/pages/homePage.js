// HomePage.js
import React from 'react';
import styles from './homePage.module.css'; // Importing the CSS module
import logo from '../ressources/images/logo_merxis.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className={styles.homePage}> {/* Use the CSS module class */}
      <div className={styles.sectionButtons}> {/* Use the CSS module class */}
        <Link to="/archivage" className={styles.buttonB}>Archivage</Link>
        <Link to="/declaration" className={styles.buttonB}>Declaration</Link>
        <Link to="/comptabilite" className={styles.buttonB}>Comptabilité</Link>
        <Link to="/facturation" className={styles.buttonB}>Facturation</Link>
        <Link to="/gestionClients" className={styles.buttonB} name = 'Gestion des clients'>Gestion des clients</Link>
        <Link to="/options" className={styles.buttonB}>Options</Link>
      </div>
      <div className={styles.imageContainer}> {/* Use the CSS module class */}
        <img src={logo} alt="Placeholder" />
      </div>
    </div>
  );
};

export default HomePage;
