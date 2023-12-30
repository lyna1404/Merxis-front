import styles from "../pages/popupForm.module.css";
import buttonStyles from "./button.module.css";
import React from 'react';


const ErrorMessage = ({ onClose, errors }) => {
  if (!errors) {
    return (
      <div className={styles.shortformpopup}>
        <p className={styles.errorHeader}>Une erreur s'est produite !</p>
        <span className={styles.buttonSpan}>
          <button className={buttonStyles.primaryButtonR} type="button" onClick={onClose}>
            Fermer
          </button>
        </span>
      </div>
    );
  }

  // If errors are in JSON format, display them
  return (
    <div className={styles.shortformpopup}>
      <p className={styles.errorHeader}>Une erreur s'est produite !</p>
      <ul className={styles.errorList}>
        {Object.keys(errors).map((key) => (
          <li className={styles.errorMessages} key={key}>
            <strong>{key}:</strong> {errors[key][0]}
          </li>
        ))}
      </ul>
      <span className={styles.buttonSpan}>
        <button className={buttonStyles.primaryButtonR} type="button" onClick={onClose}>
          Fermer
        </button>
      </span>
    </div>
  );
};

export default ErrorMessage;
