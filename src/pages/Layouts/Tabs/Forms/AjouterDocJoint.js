import React , {useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'


const AjouterDocJoint = ({ onClose,onAjouter}) => {
    
    const [code, setCode] = useState('');
    const [designation, setDesignation] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter la nouvelle marchandise
        onAjouter({code});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Document Joint</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Code" size="verysmall" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <InputField display="labelontop" label="Désignation" size="extralarge" type="text" value={code} readOnly={true} />
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

export default AjouterDocJoint;