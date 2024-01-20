import React , {useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'


const AjouterFournisseur = ({ onClose,onAjouter}) => {
    
    const [raisonSociale, setRaisonSociale] = useState('');
    const [adresse, setAdresse] = useState('');
    const [raisonSocialeArabe, setRaisonSocialeArabe] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau fournisseur
        onAjouter({raisonSociale,adresse,raisonSocialeArabe});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Fournisseur</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Raison Sociale" size="extralarge" type="text" value={raisonSociale} onChange={(e) => setRaisonSociale(e.target.value)} />
            <InputField display="labelontop" label="Adresse" size="large" type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            <InputField display="labelontop" label="Raison Sociale en Arabe" size="extralarge" type="text" value={raisonSocialeArabe} onChange={(e) => setRaisonSocialeArabe(e.target.value)} />
        </span>
        </div>
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>

        </span>
      </form>
    </div>
  );
};

export default AjouterFournisseur;