import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'

const AjoutDebours = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile }) => {
    
    const [debours, setDebours] = useState('');
    const [montant, setMontant] = useState('');
    const montantPres = "/"
    const [modePaiement, setModePaiement] = useState('');
    const [piecePaiement, setPiecePaiement] = useState('');
    const [beneficiaire, setBeneficiaire] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({ debours, modePaiement, montant, montantPres });

        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.shortformpopup}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Debours</h2>
        <div className={styles.fields_area}>
          <InputField display="labelontop" label="Debours" size="extralarge" type="text" value={debours} onChange={(e) => setDebours(e.target.value)} />

          <InputField display="labelontop" label="Montant" size="extralarge" type="text" value={montant} onChange={(e) => setMontant(e.target.value)} />
          <div className={styles.many_fields}>        
              <InputField display="labelontop" label="Mode de paiement" size="overaverage" type="text" value={modePaiement} onChange={(e) => setModePaiement(e.target.value)} />

              <InputField display="labelontop" label="N° Piece de paiement" size="large" type="text" value={piecePaiement} onChange={(e) => setPiecePaiement(e.target.value)} />
          </div>
          <InputField display="labelontop" label="Beneficiaire" size="extralarge" type="text" value={beneficiaire} onChange={(e) => setBeneficiaire(e.target.value)} />

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

export default AjoutDebours;
