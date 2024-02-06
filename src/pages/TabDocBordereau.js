import React, { useState } from "react";
import AjouterDocBordereau from "./AjouterDocBordereau";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";

const TabDocBordereau = ({onClose, onAjouter, onFileUpload, onFileUploadClick,inputFile,dossierPk}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Documents" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            <TabContent id="tab1" activeTab={activeTab} 
                                  children={<AjouterDocBordereau onClose={onClose} 
                                                          onAjouter={onAjouter} 
                                                          onFileUpload={onFileUpload} 
                                                          onFileUploadClick={onFileUploadClick}
                                                          inputFile={inputFile}
                                                          dossierPk={dossierPk}/>}/>
        </div>
    </div>
  );
};
export default TabDocBordereau;