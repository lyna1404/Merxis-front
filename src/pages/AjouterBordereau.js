import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';
import stylesLoader from './gestionClients.module.css'

const AjouterBordereau = ({ onClose,onAjouter, listeDossiers, isLoaded, onFileUpload,onFileUploadClick,inputFile }) => {
    
    const [numBE, setNumBE] = useState('');
    const [date, setDate] = useState('');
    const listeEtatRecup = [ {index:"1", etat:"Non Reçu"},{index:"2", etat:"Reçu"}]; // à récupérer
    const [etatRecup, setEtatRecup] = useState(listeEtatRecup[0].etat);  

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [numDossier, setNumDossier] = useState('');
    const [dossierPk, setDossierPk] = useState(''); // à récupérer


    const listeNumDossiers = listeDossiers.map(({dossierPk, numDossier}) => ({ ['value'] : dossierPk, ['label']:numDossier}))

    const [selectedDossier, setSelectedDossier] = useState({value: dossierPk, label:numDossier});



  const handleDossierSelection = (searchTerm) => {
    setSelectedDossier(searchTerm);
    setNumDossier(searchTerm.label);
    setDossierPk(searchTerm.value); 
};

    const handleEtatRecupChange = (event) => {
        setEtatRecup(event.target.value)        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau bordereau
        onAjouter({numBE, dossierPk, date, etatRecup});

        // Fermer le Pop Up
        onClose();
    };

      // Controle d'erreurs
      const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };
      
      const handleErrorClose = () => {
        setShowError(false);
      };

      
      const handleSuccess = () => {
          setShowSuccess(true);
        };
        
        const handleSuccessClose = () => {
          setShowSuccess(false);
          window.close();
        };

      // Styling des searchable dropdown de react-select
      const colorStyles = {
          
          control : styles => ({...styles, backgroundColor:'white',border:'none','box-shadow':'none', fontFamily:'Montserrat'}),
          option: (styles, {isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: isFocused? '#e4e1e1' : isSelected? '#a3a7d8' : 'white',
            fontFamily: 'Montserrat',
          }),
          singleValue : styles => ({...styles, color:'black', fontFamily:'Montserrat', fontSize:'16px'})
      };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Bordereau</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}>
            <span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <>
        <div className={styles.fields_area}>
            <div className={styles.many_fields}>   
                <InputField display="labelontop" label="N° Bordereau" size="overaverage" type="text" value={numBE} onChange={(e) => setNumBE(e.target.value)} />
                <label className={labelStyles.labelontop}>Date
                <DatePicker selected={date} onChange={(e) => setDate(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                </label>   
            </div>
            <div className={styles.many_fields}>        
              <label className={labelStyles.labelontop}>N° Dossier
                <Select className={labelStyles.overaverage} styles={colorStyles} options={listeNumDossiers} value={selectedDossier} placeholder="Sélectionner un dossier" onChange={(e) => handleDossierSelection(e)} isSearchable={true}/>
              </label>
              <label className={labelStyles.labelontop}>Etat Récupération
                <select className={labelStyles.overaverage} value={etatRecup} onChange={handleEtatRecupChange}>
                    <option value="">Sélectionner</option>
                    {listeEtatRecup.map((etat) => (
                    <option key={etat.index} value={etat.etat}>
                            {etat.etat}
                    </option>
                    ))}
                </select>
              </label>    
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
        </>
            )}
      </form>
    </div>
  );
};

export default AjouterBordereau;
