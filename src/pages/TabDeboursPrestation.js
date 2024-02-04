import React, { useState } from "react";
import AjoutDebours from "./AjoutDebours";
import AjoutPrestation from "./AjoutPrestation";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";

const TabDeboursPrestation = ({onClose, onAjouterDeb,onAjouterPres, onFileUpload, onFileUploadClick,inputFile, modes, types,typesPres}) => {


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
                                                                            onAjouter={onAjouterDeb} 
                                                                            onFileUpload={onFileUpload} 
                                                                            onFileUploadClick={onFileUploadClick}
                                                                            inputFile={inputFile}
                                                                            modes={modes}
                                                                            types={types}/>}
                                                                            />
                <TabContent id="tab2" activeTab={activeTab} children={<AjoutPrestation onClose={onClose} 
                                                                                    onAjouter={onAjouterPres} 
                                                                                    onFileUpload={onFileUpload} 
                                                                                    onFileUploadClick={onFileUploadClick}
                                                                                    inputFile={inputFile}
                                                                                    typesPres ={typesPres}/>}/>
        </div>
    </div>
  );
};
export default TabDeboursPrestation;