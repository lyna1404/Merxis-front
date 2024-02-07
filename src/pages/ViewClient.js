import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/breadcrumb';
import styles from './gestionClients.module.css';
import InputField from '../components/InputField';
import axios from 'axios';
import ErrorMessage from '../components/errorMessage';

const ViewClient = () => {
  const { id } = useParams(); 
  const [clientData, setClientData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [showError, setShowError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleError = (errors) => {
    setShowError(true);
    setErrorMessages(errors);
  };
  
  const handleErrorClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/clients/${id}`)
      .then((response) => {
        setClientData(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log('Error:', error);

        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Data:', error.response.data);
        }       
      });
  }, [id]);

  return (
    <>
        <Breadcrumb hideParams={true} />
        <p className={styles.pageTitle}>Informations relatives à un client existant</p>
        {!isLoaded ? ( // Conditional rendering based on the loading state
        <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
        ) : (
        <div className={styles.outerCadre}>
            <div className={styles.cadreInputs}>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Raison sociale" size="verylarge" type="text" value={clientData.raisonSociale} readOnly = {true} />
                    <InputField display="labelonleft" label="Statut juridique" size="verylarge" type="text" value={clientData.statutJuridique} readOnly = {true} />
                </span>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Adresse" size="extralarge" type="text" value={clientData.adresse} readOnly = {true} />
                    <InputField display="labelonleft" label="Code postal" size="average" type="number" value={clientData.codePostal} readOnly = {true} />
                </span>
                <div className={styles.horizontalLine}></div>
            </div>
            <div className={styles.cadreInputs}>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="N° RC" size="overaverage" type="number" value={clientData.numRC} readOnly = {true} />
                    <InputField  size="verysmall" type="number" value={clientData.numRC2} readOnly = {true} />
                    <InputField  size="verysmall" type="number" value={clientData.numRC3} readOnly = {true} />
                    <InputField display="labelonleft" label="Date RC" size="overaverage" type="text" value={clientData.dateRC} readOnly = {true} />
                    <InputField display="labelonleft" label="N° NIF" size="large" type="number" value={clientData.numNIF} readOnly = {true} />
                </span>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="N° NIS" size="overaverage" type="number" value={clientData.numNIS} readOnly = {true} />
                    <InputField display="labelonleft" label="N° Article d'imposition" size="overaverage" type="number" value={clientData.numArticleImposition} readOnly = {true}/>
                    <InputField display="labelonleft" label="N° Succursale" size="overaverage" type="number" value={clientData.numSuccursale} readOnly = {true} />
                </span>
                <div className={styles.horizontalLine}></div>
            </div>
            <div className={styles.cadreInputs}>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Représentant" size="extralarge" type="text" value={clientData.representant} readOnly = {true} />
                    <InputField  display="labelonleft" label="N° de la carte nationale" size="average" type="number" value={clientData.numCarteNationale} readOnly = {true} />
                </span>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Date de la carte nationale" size="overaverage" type="text" value={clientData.dateCarteNationale} readOnly = {true} />
                    <InputField display="labelonleft" label="Lieu de la carte nationale" size="overaverage" type="text" value={clientData.lieuCarteNationale} readOnly = {true} />
                </span>
                <div className={styles.horizontalLine}></div>
            </div>
            <div className={styles.cadreInputs}>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Tél 1" size="overaverage" type="text" value={clientData.tel1} readOnly = {true} />
                    <InputField display="labelonleft" label="Tél 2" size="overaverage" type="text" value={clientData.tel2} readOnly = {true}/>
                    <InputField display="labelonleft" label="Tél 3" size="overaverage" type="text" value={clientData.tel3} readOnly = {true}/>
                    <InputField  display="labelonleft" label="Fax" size="overaverage" type="text" value={clientData.fax} readOnly = {true}/>
                </span>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Email" size="extralarge" type="text" value={clientData.email} readOnly = {true}/>
                    <InputField display="labelonleft" label="Site Web" size="extralarge" type="text" value={clientData.siteWeb} readOnly = {true}/>
                </span>
                <div className={styles.horizontalLine}></div>
            </div>
            <div className={styles.cadreInputs}>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Raison Sociale en arabe" size="extralarge" type="text" value={clientData.raisonSocialeArabe} readOnly = {true} />
                    <InputField display="labelonleft" label="N° RC en arabe" size="average" type="text" value={clientData.numRCArabe} readOnly = {true} />
                </span>
                <span className={styles.lineOfInputs}>
                    <InputField display="labelonleft" label="Adresse en arabe" size="extralarge" type="text" value={clientData.adresseArabe} readOnly = {true} />
                </span>
                <div className={styles.horizontalLine}></div>
                
            </div>
        </div>
        
      )}
      {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}

        
        
        
        
        
        
    </>
   
);
};


export default ViewClient;
