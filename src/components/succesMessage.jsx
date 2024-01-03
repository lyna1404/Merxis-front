import styles from "../pages/popupForm.module.css";
import buttonStyles from "./button.module.css";
import React from 'react';

const SuccessMessage = ({onClose}) => {
    return (
        <div className={styles.shortformpopup}>
          <p className={styles.successHeader}>Opération accomplie avec succés !</p>
          <span className={styles.buttonSpan}>
              <button className={buttonStyles.primaryButtonG} type="button" onClick={onClose}>Fermer</button>
          </span>
      </div>
    );
}

export default SuccessMessage;