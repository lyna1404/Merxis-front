import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import labelStyles from "../components/inputField.module.css";


import Select from 'react-select'
import axios from 'axios';


const AjouterDocDossier = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile, dossierPk }) => {
    
    const [nomDocument, setNomDocument] = useState('');
    const [numDocument, setNumDocument] = useState('');
    const [docPk, setDocPk] = useState(''); 
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    const [docs, setDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState({value: docPk, label: nomDocument});
    
    const listeDocs = docs.map(({typeDocumentDossier_pk, designation}) => ({ ['value'] : typeDocumentDossier_pk, ['label']:designation}))

  const [errorMessages, setErrorMessages] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau document
        onAjouter({docPk, numDocument, date, lieu});
    };

  // Récupération des documents et types documents
  useEffect(() => {
    const docs = axios.get(`${apiUrl}/api/types-document-dossier/`)
    .then((response) => {
      const docsData = response.data;
      setDocs(docsData);
    })
    .catch((error) => {
      console.log('Error:', error);
      handleError(error.request.response);

    });
  }, []) 

    // Controle d'erreurs
    const handleError = (errors) => {
      setShowError(true);
      setErrorMessages(errors);
    };
      
    const handleSuccess = () => {
      setShowSuccess(true);
    };
    
    const handleSuccessClose = () => {
      setShowSuccess(false);
      window.close();
    };
    const handleErrorClose = () => {
      setShowError(false);
    };

    const handleDocumentSelection = (searchTerm) => {
      setSelectedDoc(searchTerm);
      setNomDocument(searchTerm.label);
      setDocPk(searchTerm.value); 
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
    <div className={styles.container}>
      <div className={styles.tab}>
        <div className={styles.tab2}>
          <form onSubmit={handleSubmit}>
            <h2>Ajout Document</h2>
            <div className={styles.fields_area}>
              <label className={labelStyles.labelontop}>Document
                <Select className={labelStyles.extralarge} styles={colorStyles} options={listeDocs} value={selectedDoc} placeholder="Sélectionner un nom" onChange={(e) => handleDocumentSelection(e)} isSearchable={true}/>
              </label>  
              <div className={styles.many_fields}> 
                  <InputField display="labelontop" label="N° Document" size="average" type="text" value={numDocument} onChange={(e) => setNumDocument(e.target.value)} />
                  <InputField display="labelontop" label="Date Etablissement" size="belowaverage" placeholder="dd/mm/yyyy" type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                  <InputField display="labelontop" label="Lieu Etablissement" size="average" type="text" value={lieu} onChange={(e) => setLieu(e.target.value)} />

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
      </div>
    </div>

  );
};

export default AjouterDocDossier;
