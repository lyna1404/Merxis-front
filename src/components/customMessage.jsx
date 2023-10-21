import styles from "../pages/popupForm.module.css";
import buttonStyles from "./button.module.css";
const CustomMessage = ({onClose,onConfirm,message}) => {
    return (
        <div className={styles.shortformpopup}>
          <p className={styles.messageHeader}>{message}</p>
          <span className={styles.buttonSpan}>
              <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
              <button className={buttonStyles.secondary} type="button" onClick={onConfirm}>Confirmer</button>
          </span>
      </div>
    );
}

export default CustomMessage;