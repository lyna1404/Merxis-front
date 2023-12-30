import React, {useState,useEffect} from 'react';
import Breadcrumb from '../components/breadcrumb';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import styles from './gestionClients.module.css';
import InputField from '../components/InputField';
import buttonStyles from "../components/button.module.css";
import labelStyles from "../components/inputField.module.css";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {formatDateToAPI} from '../Utils/dateUtils';



const NouveauClient = () => {
    const [rs, setRS] = useState("");
    const [statutJuridique, setSJ] = useState('');
    const [ListeSJ, setListeSJ] = useState([]);
    const [adresse, setAdresse] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [rc1, setRC1] = useState('');
    const [rc2, setRC2] = useState('');
    const [rc3, setRC3] = useState('');
    const [dateRc, setDateRC] = useState();
    const [NumNIF, setNif] = useState('');
    const [NumNis, setNis] = useState('');
    const [articleimp, setArticleImp] = useState('');
    const [NumSucc, setNumSucc] = useState('');
    const [representant, setRepresentant] = useState('');
    const [NumCarteNationale, setNumCarteNationale] = useState('');
    const [dateCarteNationale, setDateCarteNationale] = useState('');
    const [lieuCarteNationale, setLieuCarteNationale] = useState('');
    const [tel1, setTel1] = useState('');
    const [tel2, setTel2] = useState('');
    const [tel3, setTel3] = useState('');
    const [fax, setFax] = useState('');
    const [email, setEmail] = useState('');
    const [siteWeb, setSiteWeb] = useState('');
    const [rsArabe, setRSArabe] = useState('');
    const [rcArabe, setrcArabe] = useState('');
    const [adresseArabe, setAdresseArabe] = useState('');

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios
           .get('/api/statuts-juridiques')
           .then((response) => {
              const statuts = response.data;
              console.log(response.data);
              setListeSJ(statuts.results);
              setIsLoaded(true);
    
           })
           .catch((error) => {
            console.log('Error:', error);
            handleError(error.request.response);   
          });
     }, []);


     const handleSJChange = (event) => {
        const selectedSJ = event.target.value;
        setSJ(selectedSJ)
        
    };

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
        

    const handleAjouterClient = () => {

        setIsLoaded(false);
        const client = {
            raisonSociale: rs,
            statutJuridique: statutJuridique,
            adresse: adresse,
            codePostal: codePostal,
            numRC: rc1,
            numRC2: rc2,
            numRC3: rc3,
            dateRC: dateRc ? formatDateToAPI(dateRc) : null,
            numNIF: NumNIF,
            numNIS: NumNis,
            numArticleImposition: articleimp,
            numSuccursale: NumSucc,
            representant: representant,
            numCarteNationale: NumCarteNationale,
            dateCarteNationale: dateCarteNationale ? formatDateToAPI(dateCarteNationale) : null,
            lieuCarteNationale: lieuCarteNationale,
            tel1: tel1,
            tel2: tel2,
            tel3: tel3,
            fax: fax,
            email: email,
            siteWeb: siteWeb,
            raisonSocialeArabe: rsArabe,
            adresseArabe: adresseArabe,
            numRCArabe: rcArabe
        };
        
        console.log(client);
        
        axios
            .post('/api/clients/', JSON.stringify(client), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setIsLoaded(true);
                const clientResponse = response.data;
                console.log(clientResponse);
                handleSuccess();
            })
            .catch((error) => {
                setIsLoaded(true);
                console.log(error.request.response);
                handleError(error.request.response);
            });
    };

    return (
        <>
            <Breadcrumb  />
                <p className={styles.pageTitle}>Ajout d'un nouveau client</p>
                <p className={styles.normalText}>Les champs contenant (*) sont obligatoires !</p>
            {!isLoaded ? ( // Conditional rendering based on the loading state
            <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <div className={styles.outerCadre}>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Raison sociale *" size="verylarge" type="text" value={rs} onChange={(e) => setRS(e.target.value)} />
                        <select value={statutJuridique} onChange={handleSJChange}>
                            <option value="">Sélectionner une option</option>
                            {ListeSJ.map((statut, index) => (
                                <option key={index} value={statut}>
                                {statut}
                                </option>
                            ))}
                        </select>
                        
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Adresse" size="extralarge" type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        <InputField display="labelonleft" label="Code postal" size="average" type="number" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="N° RC" size="overaverage" type="number" value={rc1} onChange={(e) => setRC1(e.target.value)} />
                        <InputField  size="verysmall" type="number" value={rc2} onChange={(e) => setRC2(e.target.value)} />
                        <InputField  size="verysmall" type="number" value={rc3} onChange={(e) => setRC3(e.target.value)} />
                        <label className={labelStyles.labelonleft}>Date RC</label>
                        <DatePicker selected={dateRc} onChange={(e) => setDateRC(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                        <InputField display="labelonleft" label="N° NIF" size="large" type="number" value={NumNIF} onChange={(e) => setNif(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="N° NIS" size="overaverage" type="number" value={NumNis} onChange={(e) => setNis(e.target.value)} />
                        <InputField display="labelonleft" label="N° Article d'imposition" size="overaverage" type="number" value={articleimp} onChange={(e) => setArticleImp(e.target.value)} />
                        <InputField display="labelonleft" label="N° Succursale" size="overaverage" type="number" value={NumSucc} onChange={(e) => setNumSucc(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Représentant" size="extralarge" type="text" value={representant} onChange={(e) => setRepresentant(e.target.value)} />
                        <InputField  display="labelonleft" label="N° de la carte nationale" size="average" type="number" value={NumCarteNationale} onChange={(e) => setNumCarteNationale(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                    <label className={labelStyles.labelonleft}>Date de la carte nationale</label>
                    <DatePicker selected={dateCarteNationale} onChange={(e) => setDateCarteNationale(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />                        <InputField display="labelonleft" label="Lieu de la carte nationale" size="overaverage" type="text" value={lieuCarteNationale} onChange={(e) => setLieuCarteNationale(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Tél 1" size="overaverage" type="text" value={tel1} onChange={(e) => setTel1(e.target.value)} />
                        <InputField display="labelonleft" label="Tél 2" size="overaverage" type="text" value={tel2} onChange={(e) => setTel2(e.target.value)} />
                        <InputField display="labelonleft" label="Tél 3" size="overaverage" type="text" value={tel3} onChange={(e) => setTel3(e.target.value)} />
                        <InputField  display="labelonleft" label="Fax" size="overaverage" type="text" value={fax} onChange={(e) => setFax(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Email" size="extralarge" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputField display="labelonleft" label="Site Web" size="extralarge" type="text" value={siteWeb} onChange={(e) => setSiteWeb(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Raison Sociale en arabe" size="extralarge" type="text" value={rsArabe} onChange={(e) => setRSArabe(e.target.value)} />
                        <InputField display="labelonleft" label="N° RC en arabe" size="average" type="text" value={rcArabe} onChange={(e) => setrcArabe(e.target.value)} />
                       
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Adresse en arabe" size="extralarge" type="text" value={adresseArabe} onChange={(e) => setAdresseArabe(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
            </div>)}
            <span className={styles.buttonSpan_downpage}>
                    <button className={buttonStyles.primaryButtonY} type="submit" onClick={handleAjouterClient} >Enregistrer</button>
            </span>
            {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
            
            
            
            
            
            
            
        </>
       
    );
};

export default NouveauClient;