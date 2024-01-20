import React , {useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'


const AjouterMarchandises = ({ onClose,onAjouter}) => {
    
    const [designation, setDesignation] = useState('');
    const [designationArabe, setDesignationArabe] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter la nouvelle marchandise
        onAjouter({designation,designationArabe});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Nature Marchandise</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Designation" size="extralarge" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            <InputField display="labelontop" label="Designation en Arabe" size="extralarge" type="text" value={designationArabe} onChange={(e) => setDesignationArabe(e.target.value)} />
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

export default AjouterMarchandises;