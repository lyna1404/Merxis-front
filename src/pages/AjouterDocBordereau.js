import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import labelStyles from "../components/inputField.module.css";
import filterStyles from '../components/tableFilter.module.css'
import Select from 'react-select'
import axios from 'axios';


const AjouterDocBordereau = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile, dossierPk }) => {
    
    const [nomDocument, setNomDocument] = useState('');
    const [numDocument, setNumDocument] = useState('');
    const [docPk, setDocPk] = useState(''); 
    const [typeDocument, setTypeDocument] = useState('');
    const listeTypesDoc = [ {index:"1", type:"Original"},{index:"2", type:"Copie"},{index:"3", type:"Dupilicata"}];
    const [nbrDocuments, setNbrDocument] = useState('');
    const [observation, setObservation] = useState("R.A.S");

    const [listeTypes, setListeTypes] = useState([]);

    const [docs, setDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState({value: docPk, label: nomDocument});
    
    const listeDocs = docs.map(({documentDossier_pk, typeDocument}) => ({ ['value'] : documentDossier_pk, ['label']:typeDocument.designation}))

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau document
        onAjouter({docPk, nbrDocuments, typeDocument, observation});

        // Fermer le Pop Up
        onClose();
    };

  // Récupération des documents et types documents
  useEffect(() => {
    const docs = axios.get(`/api/dossiers/${dossierPk}/documents/`);
    const types = axios.get('/api/types-document/');
    Promise.all([docs, types])
    .then((responses) => {
      const docsData = responses[0].data;
      const typeData = responses[1].data;
      setDocs(docsData);
      setListeTypes(typeData.results);
    })
    .catch((error) => {
      console.log('Error:', error);
      handleError(error.request.response);

    });
  }, [dossierPk]) 

    // Controle d'erreurs
    const handleError = (errors) => {
      setShowError(true);
      setErrorMessages(errors);
    };
      
    const handleErrorClose = () => {
      setShowError(false);
    };

    const handleDocumentSelection = (searchTerm) => {
      setSelectedDoc(searchTerm);
      setNomDocument(searchTerm.label);
      setDocPk(searchTerm.value); 
      const doc = docs.filter((doc) => doc.documentDossier_pk.toString().includes(searchTerm.value.toString()))[0];
      setNumDocument(doc.numDocument);
    };

    // Styling des searchable dropdown de react-select
    const colorStyles = {
          control : // le champs d'input
          styles => ({...styles, backgroundColor:'white',border:'none',boxShadow:'none', fontFamily:'Montserrat'}),
          option: // les éléments à selectionnés
          (styles, {isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: isFocused? '#e4e1e1' : isSelected? '#a3a7d8' : 'white',
            fontFamily: 'Montserrat',
          }),
          singleValue : // option séléctionnée
          styles => ({...styles, color:'black', fontFamily:'Montserrat', fontSize:'16px'})
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Documents</h2>
        <div className={styles.fields_area}>
          <label className={labelStyles.labelontop}>Document
            <Select className={labelStyles.extralarge} styles={colorStyles} options={listeDocs} value={selectedDoc} placeholder="Sélectionner un nom" onChange={(e) => handleDocumentSelection(e)} isSearchable={true}/>
          </label>  
          <div className={styles.many_fields}> 
              <InputField display="labelontop" readOnly={true} label="N° Document" size="average" type="text" value={numDocument} onChange={(e) => setNumDocument(e.target.value)} />
       
              <span className={filterStyles.container}>
                <label className={labelStyles.labelontop}>
                  Type Document
                  <select id="modeSelect" value={typeDocument} onChange={(e) => setTypeDocument(e.target.value)}>
                      <option value="">Choisissez une option</option>
                      {listeTypes.map((statut, index) => (
                        <option key={index} value={statut}>
                          {statut}
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
