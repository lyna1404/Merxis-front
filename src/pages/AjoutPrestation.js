import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import labelStyles from "../components/inputField.module.css";

const AjoutPrestation = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile,typesPres }) => {
    
    const [typePres, setTypePres] = useState('');
    const [prestations, setPres] = useState('');
    const [presPk, setpresPk] = useState(null);
    const [selectedPres, setSelectedPres] = useState({value: presPk, label: typePres});
    
    const [prestation, setPrestation] = useState('');
    const [montant, setMontant] = useState('');
    const [modePaiement, setModePaiement] = useState('');

    const handlePresChange = (event) => {
      const selectedPresKey = event.target.value;
      const selectedOption = typesPres.find(option => option.id === selectedPresKey);
  
      setSelectedPres({ value: selectedPresKey, label: selectedOption ? selectedOption.label : '' });
      setpresPk(selectedPresKey);
      setPrestation(selectedPresKey)
      console.log(selectedPresKey);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        const typePrestation = presPk
        const id = 1;
        onAjouter({typePrestation,montant });

        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Prestations</h2>
        <div className={styles.fields_area}>
        <label className={labelStyles.labelonleft}>Préstation </label>
        <select value={prestation} onChange={handlePresChange}>
            <option value="">Sélectionner une option</option>
            {typesPres.map(({ id, value, label }) => (
                <option key={id} value={id}>
                    {label}
                </option>
            ))}
        </select>
          <div className={styles.fields_area}>        
        
          <InputField display="labelontop" label="Montant" size="large" type="text" value={montant} onChange={(e) => setMontant(e.target.value)} />

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
