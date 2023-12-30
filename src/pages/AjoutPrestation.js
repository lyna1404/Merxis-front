import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'

const AjoutPrestation = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile }) => {
    
    const [prestation, setPrestation] = useState('');
    const [montant, setMontant] = useState('');
    const [modePaiement, setModePaiement] = useState('');
    const montantDeb = "/"

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        const id = 1;
        onAjouter({ id, prestation, modePaiement, montantDeb, montant });

        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Prestations</h2>
        <div className={styles.fields_area}>
          <InputField display="labelontop" label="Prestation" size="extralarge" type="text" value={prestation} onChange={(e) => setPrestation(e.target.value)} />

          <div className={styles.many_fields}>        
        
          <InputField display="labelontop" label="Montant" size="large" type="text" value={montant} onChange={(e) => setMontant(e.target.value)} />

          <InputField display="labelontop" label="Mode de paiement" size="overaverage" type="text" value={modePaiement} onChange={(e) => setModePaiement(e.target.value)} />

          </div>

        </div>
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
            <span className={styles.attacherDocSpan}>
              <input
                style={{ display: "none" }}
                accept=".pdf, .jpeg, .jpg, .png"
                ref={inputFile}
                onChange={onFileUpload}
                type="file"
              />
              <button className={buttonStyles.attacherdocument} type="button" onClick={onFileUploadClick}>Attacher Documents</button>
            </span>
        </span>
      </form>
    </div>
  );
};

export default AjoutPrestation;
