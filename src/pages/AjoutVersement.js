import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'

const AjoutVersement = ({ onClose,onAjouter }) => {

    const [montant, setMontant] = useState('');
    const currentDate = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(currentDate);
    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau versement
        onAjouter({ montant, date });

        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.formpopup}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Versement</h2>
        <div className={styles.fields}>
            <label className={styles.labelstyle}>Montant
                <input
                    type="number"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    
                />
            </label>
            <label className={styles.labelstyle}>Date
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
        </div>
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
        </span>
      </form>
    </div>
  );
};

export default AjoutVersement;
