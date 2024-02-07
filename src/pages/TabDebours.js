import React, { useState } from "react";
import AjoutDebours from "./AjoutDebours";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";

const TabDebours = ({onClose, onAjouter, onFileUpload, onFileUploadClick,inputFile, types, modes}) => {


  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Debours" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
                <TabContent id="tab1" activeTab={activeTab} children={<AjoutDebours onClose={onClose} 
                                                                            onAjouter={onAjouter} 
                                                                            onFileUpload={onFileUpload} 
                                                                            onFileUploadClick={onFileUploadClick}
                                                                            inputFile={inputFile}
                                                                            modes={modes}
                                                                            types={types}/>}/>
        </div>
    </div>
  );
};
export default TabDebours;