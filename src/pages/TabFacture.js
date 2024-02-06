import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";
import AjouterFactureDefinitive from "./AjouterFactureDefinitive";
import AjouterFactureProforma from "./AjouterFactureProforma";


const TabFacture = ({onClose, onAjouterDéfinitive, onAjouterProforma, onFileUpload, onFileUploadClick,inputFile}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  const [listeDossiers, setListeDossiers] = useState([]);
  const [listeClients, setListeClients] = useState([]);
  const [listeMarchandises, setListeMarchandises] = useState([]);

  const [errorMessages, setErrorMessages] = useState({});
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadedDossier, setIsLoadedDossier] = useState(false);
  const [isLoadedClient, setIsLoadedClient] = useState(false);
  const [isLoadedMarchandise, setIsLoadedMarchandise] = useState(false);



  const handleError = (errors) => {
    setShowError(true);
    setErrorMessages(errors);
  };

    // Récupération de la liste de dossiers
    useEffect(() => {
        
      const dossiers = axios.get('/api/dossiers/');
      const clients = axios.get('/api/clients/');
      const marchandises = axios.get('/api/natures-marchandise/')
  
      Promise.all([dossiers, clients, marchandises])
      .then((responses) => {
        const dossiersData = responses[0].data;
        if (typeof dossiersData === 'object' && dossiersData !== null) {
          const extractedDossier = Object.values(dossiersData).map(item => ({
            dossierPk: item.dossier_pk,
            numDossier: item.numDossier,
          }));
        setListeDossiers(extractedDossier);
        setIsLoadedDossier(true)
        }
        else {
        console.error('Response data is not a JSON object:', dossiersData);
        handleError(dossiersData);
        setIsLoadedDossier(true);
      }

      const clientsData = responses[1].data;
      if (typeof clientsData === 'object' && clientsData !== null) {
        const extractedClient = Object.values(clientsData).map(item => ({
          client_pk: item.client_pk,
          raisonSociale: item.raisonSociale,
        }));
      setListeClients(extractedClient);
      setIsLoadedClient(true)
      }
      else {
      console.error('Response data is not a JSON object:', clientsData);
      handleError(clientsData);
      setIsLoadedClient(true);
    }

    const marchandisesData = responses[2].data;
    if (typeof marchandisesData === 'object' && marchandisesData !== null) {
      const extractedMarchandise = Object.values(marchandisesData).map(item => ({
        natureMarchandise_pk: item.natureMarchandise_pk,
        designation: item.designation,
      }));
    setListeMarchandises(extractedMarchandise);
    setIsLoadedMarchandise(true)
    }
    else {
    console.error('Response data is not a JSON object:', marchandisesData);
    handleError(marchandisesData);
    setListeMarchandises(true);
  }

      })
      .catch((error) => {
        console.log('Error:', error);
        handleError(error.request.response);
  
      });
  }, []);
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Définitive" activeTab={activeTab} setActiveTab={setActiveTab}/>
              <TabNavItem id="tab2" title="Proforma" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
                <TabContent id="tab1" activeTab={activeTab} children={<AjouterFactureDefinitive onClose={onClose} 
                                                                            onAjouter={onAjouterDéfinitive} 
                                                                            listeDossiers={listeDossiers}
                                                                            onFileUpload={onFileUpload} 
                                                                            onFileUploadClick={onFileUploadClick}
                                                                            isLoaded={isLoadedDossier}
                                                                            inputFile={inputFile}/>}/>
                <TabContent id="tab2" activeTab={activeTab} children={<AjouterFactureProforma onClose={onClose} 
                                                                            onAjouter={onAjouterProforma} 
                                                                            listeClients={listeClients}
                                                                            listeMarchandises={listeMarchandises}
                                                                            onFileUpload={onFileUpload} 
                                                                            onFileUploadClick={onFileUploadClick}
                                                                            isLoaded={isLoadedDossier}
                                                                            inputFile={inputFile}/>}/>
        </div>
    </div>
  );
};
export default TabFacture;