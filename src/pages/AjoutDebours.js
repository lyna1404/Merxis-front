import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import filterStyles from '../components/tableFilter.module.css'
import labelStyles from '../components/inputField.module.css'
const AjoutDebours = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile,modes, types }) => {
    
    const [typeDebours, setDebours] = useState();
    const [montant, setMontant] = useState();
    const [modePaiement, setModePaiement] = useState('');
    const [piecePaiement, setPiecePaiement] = useState('');
    const [beneficiaire, setBeneficiaire] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({ typeDebours, modePaiement, montant, piecePaiement});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Debours</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
          <label className={labelStyles.labelontop}>
            Debours
            <select id="typeSelect" value={typeDebours} onChange={(e) => setDebours(e.target.value)}>
                <option value="">Choisissez une option</option>
                { types.map(type => (
                  <option id = {type.id} key={type.value} value={type.value}>
                    {type.label}
                </option>
                ))}
              </select>
          </label>
          </span>
          <InputField display="labelontop" label="Montant" size="extralarge" type="number" value={montant} onChange={(e) => setMontant(e.target.value)} />
          <div className={styles.many_fields}>      
          <span className={filterStyles.container}>
          <label className={labelStyles.labelontop}>
            Mode de paiment
            <select id="modeSelect" value={modePaiement} onChange={(e) => setModePaiement(e.target.value)}>
                <option value="">Choisissez une option</option>
                { modes.map(mode => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                </option>
                ))}
              </select>
          </label>
          </span>
              
              <InputField display="labelontop" label="N° Piece de paiement" size="large" type="number" value={piecePaiement} onChange={(e) => setPiecePaiement(e.target.value)} />
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