import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import stylesLoader from './gestionClients.module.css'

const AjouterFactureDefinitive = ({ onClose,onAjouter, listeDossiers, isLoaded, onFileUpload,onFileUploadClick,inputFile }) => {
    
    const [numFacture, setNumFacture] = useState('');
    const [date, setDate] = useState('');
    const [numDossier, setNumDossier] = useState('');
    const [dossierPk, setDossierPk] = useState(''); 
    const [taux_tva, setTauxTVA] = useState(''); 
    const [avanceClient, setAvanceClient] = useState(''); 
    const [taux_droitTimbre, setTauxDroitTimbre] = useState(''); 

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const listeNumDossiers = listeDossiers.map(({dossierPk, numDossier}) => ({ ['value'] : dossierPk, ['label']:numDossier}))

    const [selectedDossier, setSelectedDossier] = useState({value: dossierPk, label:numDossier});



  const handleDossierSelection = (searchTerm) => {
    setSelectedDossier(searchTerm);
    setNumDossier(searchTerm.label);
    setDossierPk(searchTerm.value); 
};

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau bordereau
        onAjouter({numFacture, numDossier, dossierPk, date, taux_tva, avanceClient, taux_droitTimbre});

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
        <h2>Ajout Facture Définitive</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}>
            <span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <>
        <div className={styles.fields_area}>
            <div className={styles.many_fields}>   
                <InputField display="labelontop" label="N° Facture" size="average" type="text" value={numFacture} onChange={(e) => setNumFacture(e.target.value)} />
                <label className={labelStyles.labelontop}>Date
                <DatePicker selected={date} onChange={(e) => setDate(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                </label>   
                <label className={labelStyles.labelontop}>N° Dossier
                  <Select className={labelStyles.overaverage} styles={colorStyles} options={listeNumDossiers} value={selectedDossier} placeholder="Sélectionner un dossier" onChange={(e) => handleDossierSelection(e)} isSearchable={true}/>
                </label>
            </div>
            <div className={styles.many_fields}>   
            <InputField display="labelontop" label="Taux TVA" size="small" type="text" placeholder="xx.xx" value={taux_tva} onChange={(e) => setTauxTVA(e.target.value)} />
            <InputField display="labelontop" label="Droit de Timbre" size="belowaverage" type="text" value={taux_droitTimbre} onChange={(e) => setTauxDroitTimbre(e.target.value)} />
            <InputField display="labelontop" label="Avance Client" size="average" type="text" value={avanceClient} onChange={(e) => setAvanceClient(e.target.value)} />
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

export default AjouterFactureDefinitive;
