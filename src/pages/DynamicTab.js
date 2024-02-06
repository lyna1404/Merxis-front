import React, { useState } from "react";

import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";


/*
-- TabNavItem et TabContent ne créent pas les éléments malgré que le mapping de tabs fonctionne
Exemple de tabs:
const tabs = [{id :"tab1", title :"Debours", children : <AjoutDebours onClose={handleFormClose} 
                                                                        onAjouter={handleAjouter} 
                                                                        onFileUpload={handleFileUpload} 
                                                                        onFileUploadClick={handleFileUploadClick}
                                                                        inputFile={inputFile}/>}, 
                {id :"tab2", title : "Prestations", children : <AjoutPrestation onClose={handleFormClose} 
                                                                        onAjouter={handleAjouter} 
                                                                        onFileUpload={handleFileUpload} 
                                                                        onFileUploadClick={handleFileUploadClick}
                                                                        inputFile={inputFile}/>}]*/

const DynamicTab = ({tabs}) => {


  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
            {tabs.map(tab => {
                  <TabNavItem id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
          })}
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
          {tabs.map(tab => {
            <span key={tab.id}>
                <TabContent id={tab.id} activeTab={activeTab} children={tab.children}/>
            </span>
          })}
        </div>
    </div>
  );
};
export default DynamicTab;