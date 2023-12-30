import React, { useState } from "react";
import AjoutDebours from "./AjoutDebours";
import AjoutPrestation from "./AjoutPrestation";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";

const TabDeboursPrestation = ({onClose, onAjouter, onFileUpload, onFileUploadClick,inputFile}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  console.log(activeTab)
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Debours" activeTab={activeTab} setActiveTab={setActiveTab}/>
              <TabNavItem id="tab2" title="Prestations" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
                <TabContent id="tab1" activeTab={activeTab} children={<AjoutDebours onClose={onClose} 
                                                                            onAjouter={onAjouter} 
                                                                            onFileUpload={onFileUpload} 
                                                                            onFileUploadClick={onFileUploadClick}
                                                                            inputFile={inputFile}/>}/>
                <TabContent id="tab2" activeTab={activeTab} children={<AjoutPrestation onClose={onClose} 
                                                                                    onAjouter={onAjouter} 
                                                                                    onFileUpload={onFileUpload} 
                                                                                    onFileUploadClick={onFileUploadClick}
                                                                                    inputFile={inputFile}/>}/>
        </div>
    </div>
  );
};
export default TabDeboursPrestation;