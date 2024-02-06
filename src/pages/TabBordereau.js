import React, { useState } from "react";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";
import AjouterBordereau from "./AjouterBordereau";

const TabBoredereau = ({onClose, onAjouter, listeDossiers, isLoaded, onFileUpload, onFileUploadClick,inputFile}) => {


  const [activeTab, setActiveTab] = useState("tab1");  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Bordereau" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
                <TabContent id="tab1" activeTab={activeTab} children={<AjouterBordereau onClose={onClose} 
                                                                            onAjouter={onAjouter} 
                                                                            listeDossiers={listeDossiers}
                                                                            onFileUpload={onFileUpload} 
                                                                            onFileUploadClick={onFileUploadClick}
                                                                            isLoaded={isLoaded}
                                                                            inputFile={inputFile}/>}/>
        </div>
    </div>
  );
};
export default TabBoredereau;