import React , {useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'


const AjouterArrivee = ({ onClose,onAjouter}) => {
    
    const [nom, setNom] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau moyen
        onAjouter({nom});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>إضافة مكان وصول</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelonright" dir='rtl' label="الإسم بالعربية" size="extralarge" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
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

export default AjouterArrivee;