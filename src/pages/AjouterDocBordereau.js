import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import stylesBE from './listeBordereau.module.css'
import labelStyles from "../components/inputField.module.css";
import filterStyles from '../components/tableFilter.module.css'


const AjouterDocBordereau = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile }) => {
    
    const [nomDocument, setNomDocument] = useState('');
    const [numDocument, setNumDocument] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const listeTypesDoc = [ {index:"1", type:"Original"},{index:"2", type:"Copie"},{index:"3", type:"Dupilicata"}];
    const [nbrDocuments, setNbrDocument] = useState('');
    const [observation, setObservation] = useState("R.A.S");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        const id = 1;
        onAjouter({ id, nomDocument, numDocument, typeDocument, nbrDocuments, observation });

        // Fermer le Pop Up
        onClose();
    };



  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Documents</h2>
        <div className={styles.fields_area}>
          <InputField display="labelontop" label="Document" size="extralarge" type="text" value={nomDocument} onChange={(e) => setNomDocument(e.target.value)} />          
          <div className={styles.many_fields}> 
              <InputField display="labelontop" label="N° Document" size="average" type="text" value={numDocument} onChange={(e) => setNumDocument(e.target.value)} />
       
              <span className={filterStyles.container}>
                <label className={labelStyles.labelontop}>
                  Type Document
                  <select id="modeSelect" value={typeDocument} onChange={(e) => setTypeDocument(e.target.value)}>
                      <option value="">Choisissez une option</option>
                      { listeTypesDoc.map(type => (
                        <option key={type.index} value={type.type}>
                          {type.type}
                      </option>
                      ))}
                    </select>
                </label>
            </span>
              <InputField display="labelontop" label="Nbr Copies" size="belowaverage" type="text" value={nbrDocuments} onChange={(e) => setNbrDocument(e.target.value)} />
          </div>

          <InputField display="labelontop" label="Observation" size="extralarge" type="text" value={observation} onChange={(e) => setObservation(e.target.value)} />

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

export default AjouterDocBordereau;
