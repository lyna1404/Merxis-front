import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField';

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
    <div className={styles.shortformpopup}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Versement</h2>
        <div className={styles.fields_area}>
          <InputField display="labelontop" label="Montant" size="extralarge" type="number" value={montant} onChange={(e) => setMontant(e.target.value)} />

          <InputField display="labelontop" label="Date" size="extralarge" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

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
