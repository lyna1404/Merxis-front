import React, { useState } from "react";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";
import DocumentsDossier from "./DocumentsDossier";
import DocumentsImpression from "./DocumentsImpression";
import SuccessMessage from "../components/succesMessage";
import axios from "axios";
import { reloadPage } from "../Utils/actionUtils";

const TabDocDossier = ({onClose, isView=false, onAjouter, onFileUpload, onFileUploadClick,inputFile,dossierPk, dossier, declaration}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  const [isLoadedDocument, setIsLoadedDocument] = useState(false);
  const [errorMessages, setErrorMessages] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSuccess = () => {
    setShowSuccess(true);
  };
  
  const handleSuccessClose = () => {
    setShowSuccess(false);
    reloadPage();
  };

  const handleError = (errors) => {
    setShowError(true);
    setErrorMessages(errors);
  };
  

    //Controler l'ajout d'un document
    const handleAjouterDoc = (data) => {
        
      setIsLoadedDocument(false);

      const doc = {
        typeDocument: data.docPk,
        numDocument: data.numDocument,
        dateEtablissement: data.date,
        lieuEtablissement: data.lieu,
      }
     
      const docCreated =  axios.post(`/api/dossiers/${dossierPk}/documents/`, JSON.stringify(doc), {
        headers: {
          'Content-Type': 'application/json',
        }
        })
        .then((response) => {
            const docResponse = response.data;   
            setIsLoadedDocument(true);
            handleSuccess();
        })
        .catch((error) => {
            setIsLoadedDocument(true)
            console.log(error.request.response);  
            handleError(error.request.response);
        });
  };
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Documents" activeTab={activeTab} setActiveTab={setActiveTab}/>
              <TabNavItem id="tab2" title="Impressions" activeTab={activeTab} setActiveTab={setActiveTab}/>

           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            <TabContent id="tab1" activeTab={activeTab} 
                                  children={<DocumentsDossier onClose={onClose} 
                                                          onAjouter={handleAjouterDoc} 
                                                          onFileUpload={onFileUpload} 
                                                          onFileUploadClick={onFileUploadClick}
                                                          inputFile={inputFile}
                                                          dossierPk={dossierPk}/>}/>

            <TabContent id="tab2" activeTab={activeTab} 
                                  children={<DocumentsImpression onClose={onClose} 
                                                          onAjouter={onAjouter} 
                                                          dossierPk={dossierPk}
                                                          dossier={dossier}
                                                          declaration={declaration}/>}/>
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
                
        </div>
    </div>
  );
};
export default TabDocDossier;