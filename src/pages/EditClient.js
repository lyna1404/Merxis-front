import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/breadcrumb';
import styles from './gestionClients.module.css';
import InputField from '../components/InputField';
import axios from 'axios';
import buttonStyles from "../components/button.module.css";
import labelStyles from "../components/inputField.module.css";
import ErrorMessage from '../components/errorMessage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {formatDateFromAPI,formatDateToAPI} from '../Utils/dateUtils';
import SuccessMessage from '../components/succesMessage';

const EditClient = () => {
    const { id } = useParams();
    const [clientData, setClientData] = useState({});
    const [ListeSJ, setListeSJ] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    


  useEffect(() => {

    const client = axios.get(`/api/clients/${id}`);
    const statuts = axios.get('/api/statuts-juridiques');

    Promise.all([client, statuts])
    .then((responses) => {
      const clientResponse = responses[0].data;
      const statutsResponse = responses[1].data;
      setClientData(clientResponse);
      setListeSJ(statutsResponse.results);
      const { raisonSociale, statutJuridique, adresse, codePostal, numRC, numRC2, numRC3, dateRC, numNIF, numNIS, numArticleImposition, numSuccursale, representant, numCarteNationale, dateCarteNationale, lieuCarteNationale, tel1, tel2, tel3, fax, email, siteWeb, raisonSocialeArabe, numRCArabe, adresseArabe } = clientResponse;
        setRS(raisonSociale);
        setSJ(statutJuridique);
        setAdresse(adresse);
        setCodePostal(codePostal);
        setRC1(numRC);
        setRC2(numRC2);
        setRC3(numRC3);
        setDateRC(dateRC ? formatDateFromAPI(dateRC) : '');
        setNif(numNIF);
        setNis(numNIS);
        setArticleImp(numArticleImposition);
        setNumSucc(numSuccursale);
        setRepresentant(representant);
        setNumCarteNationale(numCarteNationale);
        setDateCarteNationale(dateCarteNationale ? formatDateFromAPI(dateCarteNationale) : '');
        setLieuCarteNationale(lieuCarteNationale);
        setTel1(tel1);
        setTel2(tel2);
        setTel3(tel3);
        setFax(fax);
        setEmail(email);
        setSiteWeb(siteWeb);
        setRSArabe(raisonSocialeArabe);
        setrcArabe(numRCArabe);
        setAdresseArabe(adresseArabe);
        setIsLoaded(true);
    })
    .catch((error) => {
        console.error('Error:', error);

        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Data:', error.response.data);
        }       
      });
}, [id]); 

const [rs, setRS] = useState(clientData.raisonSociale || '');
const [statutJuridique, setSJ] = useState(clientData.statutJuridique || '');
const [adresse, setAdresse] = useState(clientData.adresse || '');
const [codePostal, setCodePostal] = useState(clientData.codePostal || '');
const [rc1, setRC1] = useState(clientData.numRC || '');
const [rc2, setRC2] = useState(clientData.numRC2 || '');
const [rc3, setRC3] = useState(clientData.numRC3 || '');
const [dateRc, setDateRC] = useState(clientData.dateRC || '');
const [NumNIF, setNif] = useState(clientData.numNIF || '');
const [NumNis, setNis] = useState(clientData.numNIS || '');
const [articleimp, setArticleImp] = useState(clientData.numArticleImposition || '');
const [NumSucc, setNumSucc] = useState(clientData.numSuccursale || '');
const [representant, setRepresentant] = useState(clientData.representant || '');
const [NumCarteNationale, setNumCarteNationale] = useState(clientData.numCarteNationale || '');
const [dateCarteNationale, setDateCarteNationale] = useState(clientData.dateCarteNationale || '');
const [lieuCarteNationale, setLieuCarteNationale] = useState(clientData.lieuCarteNationale || '');
const [tel1, setTel1] = useState(clientData.tel1 || '');
const [tel2, setTel2] = useState(clientData.tel2 || '');
const [tel3, setTel3] = useState(clientData.tel3 || '');
const [fax, setFax] = useState(clientData.fax || '');
const [email, setEmail] = useState(clientData.email || '');
const [siteWeb, setSiteWeb] = useState(clientData.siteWeb || '');
const [rsArabe, setRSArabe] = useState(clientData.raisonSocialeArabe || '');
const [rcArabe, setrcArabe] = useState(clientData.numRCArabe || '');
const [adresseArabe, setAdresseArabe] = useState(clientData.adresseArabe || '');



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
  
  const handleSJChange = (event) => {
    const selectedSJ = event.target.value;
    setSJ(selectedSJ);
    console.log(statutJuridique);
  };

const handleModifierClient = () => {
    
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
    .put(`/api/clients/${id}/`, client, {
    headers: {
      'Content-Type': 'application/json',
    }
    })
    .then((response) => {
        const clientResponse = response.data;
        handleSuccess();
    })
    .catch((error) => {
        handleError(error.request.response);
    });
};
return (
    <>
         <Breadcrumb hideParams={true} />
            <p className={styles.pageTitle}>Modification des informations relatives à un client existant</p>
            <p className={styles.normalText}>Les champs contenant (*) sont obligatoires !</p>
            {!isLoaded ? ( // Conditional rendering based on the loading state
            <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <div className={styles.outerCadre}>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Raison sociale *" size="verylarge" type="text" value={rs} onChange={(e) => setRS(e.target.value)} />
                        <label className={labelStyles.labelonleft}>Statut juridique </label>
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
                    <DatePicker selected={dateCarteNationale || ''} onChange={(e) => setDateCarteNationale(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                    <InputField display="labelonleft" label="Lieu de la carte nationale" size="overaverage" type="text" value={lieuCarteNationale} onChange={(e) => setLieuCarteNationale(e.target.value)} />
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
                    <button className={buttonStyles.primaryButtonY} type="submit" onClick={handleModifierClient} >Enregistrer</button>
            </span>
            {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
        
        
        
    </>
   
);
};


export default EditClient;
