import React from 'react';
import styles from "../pages/popupForm.module.css";
import buttonStyles from "./button.module.css";
import { isValidJSON } from '../Utils/actionUtils';

const ErrorMessage = ({ onClose, errors }) => {
  console.log(errors);
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

  const isJsonError = isValidJSON(errors);
  return (
    <div className={styles.shortformpopup}>
      <p className={styles.errorHeader}>Une erreur s'est produite !</p>
      {isJsonError ? (
        <ul className={styles.errorList}>
          {Object.keys(JSON.parse(errors)).map((key) => (
            <li className={styles.errorMessages} key={key}>
              <strong>{key}:</strong> {JSON.parse(errors)[key][0]}
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.errorList}>
          <li className={styles.errorMessage}>Erreur inconnue.</li>
        </ul>
      )}
      <span className={styles.buttonSpan}>
        <button className={buttonStyles.primaryButtonR} type="button" onClick={onClose}>
          Fermer
        </button>
      </span>
    </div>
  );
};

export default ErrorMessage;