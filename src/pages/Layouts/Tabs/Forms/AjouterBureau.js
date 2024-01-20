import React , {useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'


const AjouterBureau = ({ onClose,onAjouter}) => {
    
    const [code, setCode] = useState('');
    const [nom, setNom] = useState('');
    const [receveurDouane, setReceveurDouane] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau bureau
        onAjouter({code,nom,receveurDouane});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Bureau Douane</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Code" size="average" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <InputField display="labelontop" label="Nom" size="extralarge" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            <InputField display="labelontop" label="Receveur en Douane" size="extralarge" type="text" value={receveurDouane} onChange={(e) => setReceveurDouane(e.target.value)} />
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

export default AjouterBureau;