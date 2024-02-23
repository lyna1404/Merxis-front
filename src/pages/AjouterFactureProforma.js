import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import stylesLoader from './gestionClients.module.css'

const AjouterFactureProforma = ({ onClose,onAjouter, listeClients, listeMarchandises, isLoaded, onFileUpload,onFileUploadClick,inputFile }) => {
    
    const [numFacture, setNumFacture] = useState('');
    const [date, setDate] = useState('');
    const [raisonSociale, setRaisonSociale] = useState('');
    const [clientPk, setClientPk] = useState(''); 
    const [natureMarchandise, setNatureMarchandise] = useState(''); 
    const [natureMarchandisePk, setNatureMarchandisePk] = useState(''); 
    const [nbrTC, setNbrTC] = useState(''); 
    const [poids, setPoids] = useState(''); 
    const [nbrColis, setNbrColis] = useState(''); 
    const [taux_tva, setTauxTVA] = useState(''); 

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const listeRaisonsSociales = listeClients.map(({client_pk, raisonSociale}) => ({ ['value'] : client_pk, ['label']:raisonSociale}))
    const [selectedRaisonSociale, setSelectedRaisonSociale] = useState({value: clientPk, label:raisonSociale});

    const listeNaturesMarchandise = listeMarchandises.map(({natureMarchandise_pk, designation}) => ({ ['value'] : natureMarchandise_pk, ['label']:designation}))
    const [selectedNatureMarchandise, setSelectedNatureMarchandise] = useState({value: natureMarchandisePk, label:natureMarchandise});


    const handleMarchandiseSelection = (searchTerm) => {
      setSelectedNatureMarchandise(searchTerm);
      setNatureMarchandise(searchTerm.label);
      setNatureMarchandisePk(searchTerm.value);
    };

    const handleClientSelection = (searchTerm) => {
      setSelectedRaisonSociale(searchTerm);
      setRaisonSociale(searchTerm.label);
      setClientPk(searchTerm.value); 
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau bordereau
        onAjouter({numFacture, clientPk, natureMarchandisePk, date, taux_tva, nbrColis, nbrTC, poids});

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
        <h2>Ajout Facture Proforma</h2>
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
                <label className={labelStyles.labelontop}>Client
                  <Select className={labelStyles.overaverage} styles={colorStyles} options={listeRaisonsSociales} value={selectedRaisonSociale} placeholder="Sélectionner un client" onChange={(e) => handleClientSelection(e)} isSearchable={true}/>
                </label>
                <label className={labelStyles.labelontop}>Nature Marchandise
                  <Select className={labelStyles.large} styles={colorStyles} options={listeNaturesMarchandise} value={selectedNatureMarchandise} placeholder="Sélectionner une nature marchandise" onChange={(e) => handleMarchandiseSelection(e)} isSearchable={true}/>
                </label>
                <InputField display="labelontop" label="Nbr TC" size="verysmall" type="number" value={nbrTC} onChange={(e) => setNbrTC(e.target.value)} />
                <InputField display="labelontop" label="Poids" size="belowaverage" type="text" value={poids} onChange={(e) => setPoids(e.target.value)} />
                <InputField display="labelontop" label="Nbr Colis" size="verysmall" type="number" value={nbrColis} onChange={(e) => setNbrColis(e.target.value)} />

            </div>
            <div className={styles.many_fields}>   
            <InputField display="labelontop" label="Taux TVA" size="small" type="text" placeholder="xx.xx" value={taux_tva} onChange={(e) => setTauxTVA(e.target.value)} />
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

export default AjouterFactureProforma;
